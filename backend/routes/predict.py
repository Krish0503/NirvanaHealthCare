import os
import joblib
import pandas as pd
from flask import Blueprint, request, jsonify

predict_bp = Blueprint("predict", __name__)

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "model.joblib")

# Cache model in memory
_model_artifact = None


def get_model_artifact():
    global _model_artifact
    if _model_artifact is None:
        if os.path.exists(MODEL_PATH):
            _model_artifact = joblib.load(MODEL_PATH)
            print(f"[ML Predict] Successfully loaded model from {MODEL_PATH}")
        else:
            print(f"[ML Predict] Warning: {MODEL_PATH} not found. Please run train_model.py first.")
    return _model_artifact


# Metadata mapping for ML predicted diseases
DISEASE_METADATA = {
    "Pneumonia": {
        "riskLevel": "High",
        "riskColor": "danger",
        "recommendedDoctor": "Pulmonologist / General Medicine",
        "advice": [
            "Seek urgent medical evaluation for diagnostic verification (chest X-ray/labs).",
            "Monitor oxygen saturation (SpO2) and respiratory rate.",
            "Stay well-rested in an elevated position."
        ]
    },
    "Influenza (Flu)": {
        "riskLevel": "Moderate",
        "riskColor": "warning",
        "recommendedDoctor": "General Medicine",
        "advice": [
            "Maintain oral hydration with electrolyte solutions.",
            "Get adequate bed rest and monitor temperature.",
            "Consult a physician if fever remains elevated above 101°F."
        ]
    },
    "Dengue Fever": {
        "riskLevel": "High",
        "riskColor": "danger",
        "recommendedDoctor": "Internal Medicine / Infectious Disease",
        "advice": [
            "Get a CBC (Complete Blood Count) to monitor platelet count.",
            "Maintain high fluid intake and complete physical rest.",
            "Seek immediate care if warning signs like bleeding or persistent vomiting occur."
        ]
    },
    "Malaria": {
        "riskLevel": "High",
        "riskColor": "danger",
        "recommendedDoctor": "Infectious Disease / General Medicine",
        "advice": [
            "Get a blood smear / rapid diagnostic test (RDT) for malaria.",
            "Stay hydrated and avoid strenuous exertion.",
            "Consult a healthcare professional for prescription antimalarials."
        ]
    },
    "COVID-19": {
        "riskLevel": "Moderate",
        "riskColor": "warning",
        "recommendedDoctor": "Pulmonologist / General Medicine",
        "advice": [
            "Self-isolate to prevent transmission.",
            "Monitor SpO2 levels and fever.",
            "Consult a doctor for symptom management."
        ]
    },
    "Gastroenteritis": {
        "riskLevel": "Moderate",
        "riskColor": "warning",
        "recommendedDoctor": "Gastroenterologist",
        "advice": [
            "Drink Oral Rehydration Salts (ORS) frequently.",
            "Follow a bland diet (BRAT: Bananas, Rice, Applesauce, Toast).",
            "Seek medical care if unable to retain fluids."
        ]
    },
    "Migraine": {
        "riskLevel": "Moderate",
        "riskColor": "warning",
        "recommendedDoctor": "Neurologist",
        "advice": [
            "Rest in a quiet, dark room.",
            "Apply cold compresses to forehead/neck.",
            "Avoid bright lights and screen glare."
        ]
    },
    "Typhoid": {
        "riskLevel": "High",
        "riskColor": "danger",
        "recommendedDoctor": "General Medicine / Gastroenterologist",
        "advice": [
            "Undergo Widal or blood culture test as advised by physician.",
            "Drink boiled/filtered water and consume soft warm foods.",
            "Take prescribed antibacterial medication completely."
        ]
    },
    "Common Cold": {
        "riskLevel": "Low",
        "riskColor": "success",
        "recommendedDoctor": "General Practitioner",
        "advice": [
            "Perform warm saline gargles for throat discomfort.",
            "Use steam inhalation for nasal congestion.",
            "Get 7-8 hours of sleep and drink warm tea/liquids."
        ]
    },
    "Allergic Rhinitis": {
        "riskLevel": "Low",
        "riskColor": "success",
        "recommendedDoctor": "ENT Specialist / Allergist",
        "advice": [
            "Avoid exposure to known dust, pollen, or pet dander triggers.",
            "Use saline nasal sprays if needed.",
            "Consult an allergist if symptoms recur frequently."
        ]
    },
    "GERD (Acid Reflux)": {
        "riskLevel": "Low",
        "riskColor": "success",
        "recommendedDoctor": "Gastroenterologist",
        "advice": [
            "Avoid spicy, oily, or acidic foods before bedtime.",
            "Eat smaller, frequent meals.",
            "Avoid lying down for 2 hours after meals."
        ]
    },
    "Asthma": {
        "riskLevel": "Moderate",
        "riskColor": "warning",
        "recommendedDoctor": "Pulmonologist",
        "advice": [
            "Use prescribed inhaler as directed by doctor.",
            "Avoid cold air, dust, and smoking triggers.",
            "Seek emergency care if wheezing worsens."
        ]
    },
    "Arthritis": {
        "riskLevel": "Low",
        "riskColor": "success",
        "recommendedDoctor": "Rheumatologist / Orthopedist",
        "advice": [
            "Engage in low-impact exercises like swimming or walking.",
            "Apply warm compresses to stiff joints.",
            "Maintain a healthy weight to reduce joint stress."
        ]
    }
}


@predict_bp.route("/api/predict", methods=["POST"])
def predict():
    """ML Prediction endpoint based on scikit-learn model."""
    artifact = get_model_artifact()
    if not artifact:
        return jsonify({"error": "ML model not trained/loaded yet. Run train_model.py first."}), 500

    data = request.get_json() or {}
    symptoms = data.get("symptoms", [])

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    model = artifact["model"]
    feature_names = artifact["feature_names"]

    # Construct input vector (1 if symptom in list, else 0)
    input_dict = {feat: [1 if feat in symptoms else 0] for feat in feature_names}
    input_df = pd.DataFrame(input_dict)

    # Prediction & Probabilities
    predicted_disease = model.predict(input_df)[0]
    probabilities = model.predict_proba(input_df)[0]
    max_prob = float(max(probabilities))

    # Metadata lookup
    meta = DISEASE_METADATA.get(predicted_disease, {
        "riskLevel": "Low",
        "riskColor": "success",
        "recommendedDoctor": "General Practitioner",
        "advice": [
            "Monitor symptoms carefully over the next 24-48 hours.",
            "Maintain proper hydration and rest.",
            "Consult a physician if symptoms persist or worsen."
        ]
    })

    return jsonify({
        "prediction": predicted_disease,
        "confidence": f"{int(max_prob * 100)}%",
        "riskLevel": meta["riskLevel"],
        "riskColor": meta["riskColor"],
        "description": f"scikit-learn Random Forest model predicted {predicted_disease} with {int(max_prob * 100)}% confidence based on your symptom features.",
        "advice": meta["advice"],
        "recommendedDoctor": meta["recommendedDoctor"],
        "modelType": "scikit-learn RandomForestClassifier"
    })
