from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from firebase_admin import db


register_blueprint = Blueprint("register", __name__)

@register_blueprint.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        phone = data.get('phone')
        name = data.get('name')
        lastname = data.get('lastname')
        role = data.get('role', 'viewer')
        department = data.get('department', 'General')

        ref = db.reference("users")
        users = ref.get()
        if users:
            for user in users.values():
                if user.get('email') == email:
                    return jsonify({"message": "User with this email already exists."}), 400
                if user.get('phone') == phone:
                    return jsonify({"message": "User with this phone number already exists."}), 400

        hashed_password = generate_password_hash(password)
        ref.push({
            "email": email,
            "password": hashed_password,
            "phone": phone,
            "name": name,
            "lastname": lastname,
            "role": role,
            "department": department,
        })
        return jsonify({"message": "User registered successfully."}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "An internal error occurred."}), 500
