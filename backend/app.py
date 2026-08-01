"""
Nirvana HealthCare — Flask Backend
Run:  python app.py
API:  http://localhost:5000/api/doctors
"""

from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from models import db
from routes import doctors_bp, appointments_bp, predict_bp, auth_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for deployed frontend (Vercel) and local dev
    CORS(app, origins=["https://nirvana-healthcare.vercel.app", "http://localhost:3000"])

    # Initialise database
    db.init_app(app)

    # Root endpoint for health check
    @app.route("/")
    def home():
        return jsonify({
            "name": "Nirvana HealthCare API",
            "status": "online",
            "endpoints": {
                "doctors": "/api/doctors",
                "appointments": "/api/appointments",
                "predict": "/api/predict",
                "auth_login": "/api/auth/login",
                "auth_register": "/api/auth/register"
            }
        })

    # Register route blueprints
    app.register_blueprint(doctors_bp)
    app.register_blueprint(appointments_bp)
    app.register_blueprint(predict_bp)
    app.register_blueprint(auth_bp)

    # Create tables on first run
    with app.app_context():
        # Import models so SQLAlchemy sees them
        from models.doctor import Doctor        # noqa: F401
        from models.appointment import Appointment  # noqa: F401
        from models.user import User            # noqa: F401
        db.create_all()

    return app


# Create the app instance (used by seed.py and direct run)
app = create_app()

if __name__ == "__main__":
    print("Nirvana HealthCare API running at http://localhost:5000")
    app.run(debug=True, port=5000)
