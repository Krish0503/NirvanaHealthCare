from flask import Blueprint, request, jsonify

from models import db
from models.doctor import Doctor
from models.appointment import Appointment

from .predict import predict_bp

doctors_bp = Blueprint("doctors", __name__)
appointments_bp = Blueprint("appointments", __name__)


# ── Doctor routes ────────────────────────────────────────────
@doctors_bp.route("/api/doctors", methods=["GET"])
def get_doctors():
    """Return all doctors as JSON."""
    doctors = Doctor.query.order_by(Doctor.name).all()
    return jsonify([d.to_dict() for d in doctors])


@doctors_bp.route("/api/doctors/<int:doctor_id>", methods=["GET"])
def get_doctor(doctor_id):
    """Return a single doctor by ID."""
    doctor = Doctor.query.get_or_404(doctor_id)
    return jsonify(doctor.to_dict())


# ── Appointment routes ───────────────────────────────────────
@appointments_bp.route("/api/book", methods=["POST"])
def book_appointment():
    """Book an appointment with a doctor."""
    data = request.get_json()

    # Validate required fields
    required = ["doctor_id", "patient_name", "slot_time"]
    for field in required:
        if field not in data or not data[field]:
            return jsonify({"error": f"'{field}' is required"}), 400

    # Check doctor exists
    doctor = Doctor.query.get(data["doctor_id"])
    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404

    appointment = Appointment(
        doctor_id=data["doctor_id"],
        patient_name=data["patient_name"],
        slot_time=data["slot_time"],
        status="confirmed",
    )
    db.session.add(appointment)
    db.session.commit()

    return jsonify({
        "message": "Appointment booked successfully!",
        "appointment": appointment.to_dict(),
    }), 201


@appointments_bp.route("/api/appointments", methods=["GET"])
def get_appointments():
    """Return all appointments."""
    appointments = Appointment.query.order_by(Appointment.id.desc()).all()
    return jsonify([a.to_dict() for a in appointments])
