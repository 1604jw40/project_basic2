import os
import sys
import joblib

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, "..", ".."))
sys.path.append(PROJECT_ROOT)

from model.src.preprocess import transform_customer_to_dataframe

bundle = joblib.load(os.path.join(PROJECT_ROOT, "model", "artifacts", "model_v1.joblib"))

model = bundle["model"]
feature_names = bundle["feature_names"]
threshold = bundle["threshold"]
scaler = bundle["scaler"]


def predict_from_raw_customer(customer: dict) -> dict:
    X = transform_customer_to_dataframe(customer, feature_names)

    numeric_cols = list(scaler.feature_names_in_)
    X_scaled = X.copy()
    X_scaled[numeric_cols] = scaler.transform(X_scaled[numeric_cols])

    score = float(model.predict_proba(X_scaled)[:, 1][0])
    prediction_label = 1 if score >= threshold else 0

    return {
        "customer_id": customer["customer_id"],
        "score": score,
        "threshold": threshold,
        "prediction_label": prediction_label,
    }