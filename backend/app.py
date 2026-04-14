from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017/")
db = client["userDB"]

users_collection = db["users"]
training_collection = db["training_data"]

def calculate_features(data):
    keystrokes = data.get("keystrokes", [])
    mouse_data = data.get("mouseData", [])
    words = data.get("words", 0)
    time_taken = data.get("timeTaken", 1)
    wpm = words / (time_taken / 60) if time_taken > 0 else 0

    hold_times = [
        k.get("holdTime", 0)
        for k in keystrokes
        if k.get("type") == "up"
    ]
    avg_hold = sum(hold_times) / len(hold_times) if hold_times else 0

    intervals = [
        k.get("delayFromLastKey", 0)
        for k in keystrokes
        if k.get("type") == "down"
    ]
    avg_interval = sum(intervals) / len(intervals) if intervals else 0
    mouse_activity = len(mouse_data)
    return {
        "wpm": round(wpm, 2),
        "avgHoldTime": round(avg_hold, 2),
        "avgInterval": round(avg_interval, 2),
        "mouseActivity": mouse_activity
    }

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    existing = users_collection.find_one({
        "$or": [{"username": username}, {"email": email}]
    })
    if existing:
        return jsonify({"status": "exists"})
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"status": "saved"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"status": "fail"})

    if not bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        return jsonify({"status": "fail"})

    return jsonify({
        "status": "success",
        "userId": str(user["_id"])
    })

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get("email")
    new_password = data.get("newPassword")
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"status": "fail"})
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    users_collection.update_one(
        {"email": email},
        {"$set": {"password": hashed_password}}
    )
    return jsonify({"status": "success"})

@app.route('/training-data', methods=['POST'])
def training_data():
    data = request.json

    print("📥 Received Training Data for:", data.get("userId"))

    features = calculate_features(data)
    print(" Calculated Features:", features)

    final_data = {
        **data,
        **features
    }

    training_collection.insert_one(final_data)

    return jsonify({
        "status": "saved",
        "features": features
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)