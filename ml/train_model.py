"""
Nirvana HealthCare — Machine Learning Model Training Script
Trains a Random Forest classifier on symptom-disease dataset and exports with joblib.
"""

import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "dataset", "symptoms_dataset.csv")
MODEL_OUTPUT_PATH = os.path.join(BASE_DIR, "model.joblib")
BACKEND_MODEL_PATH = os.path.join(os.path.dirname(BASE_DIR), "backend", "model.joblib")


def train():
    print(f"[ML] Loading dataset from: {DATASET_PATH}")
    df = pd.read_csv(DATASET_PATH)

    # Separate features and target
    X = df.drop(columns=["disease"])
    y = df["disease"]
    feature_names = list(X.columns)

    print(f"[ML] Dataset shape: {df.shape} | Classes: {y.nunique()}")
    print(f"[ML] Features ({len(feature_names)}): {feature_names}")

    # Train / Test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Train Random Forest Classifier
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"[ML] Model Accuracy: {acc * 100:.2f}%")

    # Package model + feature names into artifact
    artifact = {
        "model": model,
        "feature_names": feature_names,
        "classes": list(model.classes_),
    }

    # Save artifact in both ml/ and backend/
    joblib.dump(artifact, MODEL_OUTPUT_PATH)
    joblib.dump(artifact, BACKEND_MODEL_PATH)
    print(f"[ML] Saved model artifact to: {MODEL_OUTPUT_PATH}")
    print(f"[ML] Copied model artifact to backend: {BACKEND_MODEL_PATH}")


if __name__ == "__main__":
    train()
