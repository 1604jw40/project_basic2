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


def get_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT")),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=False,
    )


def main():
    conn = get_connection()

    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM customers_raw")
            customers = cursor.fetchall()

        if not customers:
            print("customers_raw 테이블에 데이터가 없습니다.")
            return

        print(f"총 고객 수: {len(customers)}")

        insert_sql = """
        INSERT INTO churn_predictions (
            customer_id,
            model_version,
            score,
            threshold_value,
            prediction_label
        ) VALUES (%s, %s, %s, %s, %s)
        """

        inserted_count = 0

        with conn.cursor() as cursor:
            for customer in customers:
                X = transform_customer_to_dataframe(customer, feature_names)

                numeric_cols = list(scaler.feature_names_in_)
                X_scaled = X.copy()
                X_scaled[numeric_cols] = scaler.transform(X_scaled[numeric_cols])

                score = float(model.predict_proba(X_scaled)[:, 1][0])
                prediction_label = 1 if score >= threshold else 0

                cursor.execute(
                    insert_sql,
                    (
                        customer["customer_id"],
                        "xgb_v1",
                        score,
                        threshold,
                        prediction_label,
                    ),
                )
                inserted_count += 1

        conn.commit()

        print("배치 예측 완료")
        print(f"저장된 예측 수: {inserted_count}")

    except Exception as e:
        conn.rollback()
        print("오류 발생:", e)
        raise

    finally:
        conn.close()


if __name__ == "__main__":
    main()