from flask import Blueprint, request, jsonify
from models import db
from models.user import User

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/auth/register", methods=["POST"])
def register():
    """Register a new patient account."""
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email is already registered. Please login instead."}), 400

    user = User(name=name, email=email, role="patient")
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful!",
        "user": user.to_dict()
    }), 201


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    """Login patient account."""
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful!",
        "user": user.to_dict()
    }), 200
