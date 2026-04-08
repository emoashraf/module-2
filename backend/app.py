from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 🔥 IMPORTANT

# 🔥 REGISTER API
@app.route('/register', methods=['POST'])
def register():
    data = request.json

    print("Received Data:", data)

    return jsonify({"status": "saved"})


# 🔥 LOGIN API
@app.route('/login', methods=['POST'])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    # simple check
    if email and password:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "failed"})


# 🔥 MONITOR API
@app.route('/monitor', methods=['POST'])
def monitor():
    data = request.json
    print("Live Data:", data)

    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True)