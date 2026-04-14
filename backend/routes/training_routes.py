from flask import Blueprint, request, jsonify
from config.db import training_collection
from services.feature_engineering import extract_features
from utils.helpers import get_current_timestamp

training_routes = Blueprint("training_routes", __name__)

@training_routes.route('/training-data', methods=['POST'])
def training_data():
    data = request.json

    print("📥 Training Data Received")
    features = extract_features(data)
    final_data = {
        **data,
        **features,
        "processedAt": get_current_timestamp()
    }
    training_collection.insert_one(final_data)
    return jsonify({
        "status": "saved",
        "features": features
    })