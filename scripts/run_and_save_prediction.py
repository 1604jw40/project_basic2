import os
import sys
import joblib
import pymysql
from dotenv import load_dotenv

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
sys.path.append(PROJECT_ROOT)

from model.src.preprocess import transform_customer_to_dataframe

load_dotenv()

bundle = joblib.load(os.path.join(PROJECT_ROOT, "model", "artifacts", "model_v1.joblib"))

model = bundle["model"]
feature_names = bundle["feature_names"]
threshold = bundle["threshold"]
scaler = bundle["scaler"]

conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor,
    autocommit=False
)

try:
    customer_id = "0002-ORFBO"

    with conn.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM customers_raw WHERE customer_id = %s",
            (customer_id,)
        )
        customer = cursor.fetchone()

        if customer is None:
            raise ValueError(f"고객을 찾을 수 없습니다: {customer_id}")

    X = transform_customer_to_dataframe(customer, feature_names)

    numeric_cols = list(scaler.feature_names_in_)
    X_scaled = X.copy()
    X_scaled[numeric_cols] = scaler.transform(X_scaled[numeric_cols])

    score = float(model.predict_proba(X_scaled)[:, 1][0])
    prediction_label = 1 if score >= threshold else 0

    with conn.cursor() as cursor:
        insert_sql = """
        INSERT INTO churn_predictions (
            customer_id,
            model_version,
            score,
            threshold_value,
            prediction_label
        ) VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(
            insert_sql,
            (
                customer["customer_id"],
                "xgb_v1",
                score,
                threshold,
                prediction_label
            )
        )

    conn.commit()

    print("=== 저장 완료 ===")
    print("customer_id:", customer["customer_id"])
    print("score:", round(score, 6))
    print("threshold:", threshold)
    print("prediction_label:", prediction_label)

finally:
    conn.close()