from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client["userDB"]
users_collection = db["users"]
training_collection = db["training_data"]