from . import db


class Appointment(db.Model):
    """Appointment model — booking a slot with a doctor."""
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors.id"), nullable=False)
    patient_name = db.Column(db.String(120), nullable=False)
    slot_time = db.Column(db.String(50), nullable=False)        # e.g. "2025-08-02 10:00"
    status = db.Column(db.String(20), nullable=False, default="confirmed")

    def to_dict(self):
        return {
            "id": self.id,
            "doctor_id": self.doctor_id,
            "patient_name": self.patient_name,
            "slot_time": self.slot_time,
            "status": self.status,
            "doctor_name": self.doctor.name if self.doctor else None,
        }
