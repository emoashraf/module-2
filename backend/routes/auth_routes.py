from flask import Blueprint, request, jsonify
from config.db import users_collection
from models.user_model import create_user
auth_routes = Blueprint("auth_routes", __name__)
@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    existing = users_collection.find_one({
        "$or": [
            {"username": data.get("username")},
            {"email": data.get("email")}
        ]
    })

    if existing:
        return jsonify({"status": "exists"})
    user = create_user(
        data.get("username"),
        data.get("email"),
        data.get("password")
    )
    users_collection.insert_one(user)
    return jsonify({"status": "saved"})

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = users_collection.find_one({
        "username": data.get("username"),
        "password": data.get("password")
    })
    if user:
        return jsonify({"status": "success"})
    return jsonify({"status": "fail"})
@auth_routes.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    user = users_collection.find_one({"email": data.get("email")})
    if user:
        users_collection.update_one(
            {"email": data.get("email")},
            {"$set": {"password": data.get("newPassword")}}
        )
        return jsonify({"status": "success"})

    return jsonify({"status": "fail"})