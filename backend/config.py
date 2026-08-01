import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    """Base configuration — uses SQLite for local development.
    To switch to MySQL for production, set the DATABASE_URL env var:
        DATABASE_URL=mysql+mysqlconnector://user:pass@localhost/nirvana_db
    """
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(BASE_DIR, 'nirvana.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "nirvana-dev-secret-key")
