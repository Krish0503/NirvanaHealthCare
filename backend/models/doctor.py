from . import db


class Doctor(db.Model):
    """Doctor model — stores doctor profiles for the platform."""
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    hospital = db.Column(db.String(200), nullable=False)
    experience = db.Column(db.Integer, nullable=False)          # years
    fee = db.Column(db.Float, nullable=False)                   # consultation fee

    # Relationships
    appointments = db.relationship("Appointment", backref="doctor", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "specialization": self.specialization,
            "hospital": self.hospital,
            "experience": self.experience,
            "fee": self.fee,
        }
