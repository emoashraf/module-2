
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["userDB"]

users_collection = db["users"]
training_collection = db["training_data"]

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

    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": password
    })

    return jsonify({"status": "saved"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({
        "username": username,
        "password": password
    })

    if user:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "fail"})


@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json

    email = data.get("email")
    new_password = data.get("newPassword")

    user = users_collection.find_one({"email": email})

    if user:
        users_collection.update_one(
            {"email": email},
            {"$set": {"password": new_password}}
        )
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "fail"})

@app.route('/training-data', methods=['POST'])
def training_data():
    data = request.json

    print("📥 Received Training Data")

    training_collection.insert_one(data)

    return jsonify({
        "status": "saved",
        "message": "Training data stored successfully"
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)