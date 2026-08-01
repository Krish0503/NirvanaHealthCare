"""Seed the database with ~15 sample doctors."""

from app import app
from models import db
from models.doctor import Doctor

SEED_DOCTORS = [
    {"name": "Dr. Ananya Sharma",     "specialization": "Cardiology",       "hospital": "Apollo Hospital",              "experience": 12, "fee": 800},
    {"name": "Dr. Rajesh Patel",      "specialization": "Orthopedics",      "hospital": "Fortis Hospital",              "experience": 15, "fee": 700},
    {"name": "Dr. Priya Nair",        "specialization": "Dermatology",      "hospital": "Max Healthcare",               "experience": 8,  "fee": 600},
    {"name": "Dr. Vikram Singh",      "specialization": "Neurology",        "hospital": "AIIMS",                        "experience": 20, "fee": 1000},
    {"name": "Dr. Sneha Reddy",       "specialization": "Pediatrics",       "hospital": "Rainbow Children's Hospital",  "experience": 10, "fee": 500},
    {"name": "Dr. Arjun Mehta",       "specialization": "General Medicine", "hospital": "Medanta Hospital",             "experience": 6,  "fee": 400},
    {"name": "Dr. Kavita Desai",      "specialization": "Gynecology",       "hospital": "Manipal Hospital",             "experience": 14, "fee": 750},
    {"name": "Dr. Suresh Kumar",      "specialization": "ENT",              "hospital": "Narayana Health",              "experience": 11, "fee": 550},
    {"name": "Dr. Meera Iyer",        "specialization": "Ophthalmology",    "hospital": "Sankara Nethralaya",           "experience": 9,  "fee": 650},
    {"name": "Dr. Amit Gupta",        "specialization": "Oncology",         "hospital": "Tata Memorial Hospital",       "experience": 18, "fee": 1200},
    {"name": "Dr. Fatima Khan",       "specialization": "Psychiatry",       "hospital": "NIMHANS",                      "experience": 7,  "fee": 500},
    {"name": "Dr. Rohan Joshi",       "specialization": "Pulmonology",      "hospital": "Breach Candy Hospital",        "experience": 13, "fee": 850},
    {"name": "Dr. Lakshmi Venkat",    "specialization": "Endocrinology",    "hospital": "CMC Vellore",                  "experience": 16, "fee": 900},
    {"name": "Dr. Siddharth Rao",     "specialization": "Urology",          "hospital": "Kokilaben Hospital",           "experience": 10, "fee": 700},
    {"name": "Dr. Neha Agarwal",      "specialization": "Dentistry",        "hospital": "Clove Dental",                 "experience": 5,  "fee": 350},
]


def seed():
    with app.app_context():
        db.create_all()

        # Only seed if table is empty
        if Doctor.query.count() == 0:
            for doc in SEED_DOCTORS:
                db.session.add(Doctor(**doc))
            db.session.commit()
            print(f"[OK] Seeded {len(SEED_DOCTORS)} doctors.")
        else:
            print(f"[INFO] Database already has {Doctor.query.count()} doctors -- skipping seed.")


if __name__ == "__main__":
    seed()
