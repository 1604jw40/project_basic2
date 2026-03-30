import os
import time
import pymysql
import pandas as pd
import joblib
import sys

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(PROJECT_ROOT)

from model.src.preprocess import transform_customer_to_dataframe


DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_USER = os.getenv("DB_USER", "appuser")
DB_PASSWORD = os.getenv("DB_PASSWORD", "app1234")
DB_NAME = os.getenv("DB_NAME", "telco_churn_db")


def get_connection():
    return pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=False,
    )


def wait_for_db(max_retries=30, delay=2):
    for attempt in range(1, max_retries + 1):
        try:
            conn = get_connection()
            conn.close()
            print("DB 연결 확인 완료")
            return
        except Exception as e:
            print(f"DB 대기 중... ({attempt}/{max_retries}) -> {e}")
            time.sleep(delay)
    raise RuntimeError("DB 연결 실패")


def load_customers():
    conn = get_connection()
    csv_path = os.path.join(PROJECT_ROOT, "data", "raw", "telco-customer.csv")
    df = pd.read_csv(csv_path)

    # 원본 CSV 컬럼명 기준
    df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")

    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM churn_predictions")
            cursor.execute("DELETE FROM customers_raw")
            cursor.execute("DELETE FROM customer_id_sequence")

            sql = """
            INSERT INTO customers_raw (
                customer_id, gender, senior_citizen, partner, dependents,
                tenure, phone_service, multiple_lines, internet_service,
                online_security, online_backup, device_protection, tech_support,
                streaming_tv, streaming_movies, contract_type, paperless_billing,
                payment_method, monthly_charges, total_charges, churn
            ) VALUES (
                %s, %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s, %s
            )
            """

            values = []
            for _, row in df.iterrows():
                values.append((
                    row["customerID"],
                    row["gender"],
                    int(row["SeniorCitizen"]),
                    row["Partner"],
                    row["Dependents"],
                    int(row["tenure"]),
                    row["PhoneService"],
                    row["MultipleLines"],
                    row["InternetService"],
                    row["OnlineSecurity"],
                    row["OnlineBackup"],
                    row["DeviceProtection"],
                    row["TechSupport"],
                    row["StreamingTV"],
                    row["StreamingMovies"],
                    row["Contract"],
                    row["PaperlessBilling"],
                    row["PaymentMethod"],
                    float(row["MonthlyCharges"]),
                    None if pd.isna(row["TotalCharges"]) else float(row["TotalCharges"]),
                    row["Churn"],
                ))

            cursor.executemany(sql, values)

        conn.commit()
        print(f"customers_raw 적재 완료: {len(df)}건")

    except Exception:
        conn.rollback()
        raise

    finally:
        conn.close()


def run_batch_prediction():
    bundle = joblib.load(os.path.join(PROJECT_ROOT, "model", "artifacts", "model_v1.joblib"))
    model = bundle["model"]
    feature_names = bundle["feature_names"]
    threshold = bundle["threshold"]
    scaler = bundle["scaler"]

    conn = get_connection()

    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM customers_raw")
            customers = cursor.fetchall()

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

    except Exception:
        conn.rollback()
        raise

    finally:
        conn.close()


if __name__ == "__main__":
    wait_for_db()
    load_customers()
    run_batch_prediction()
    print("초기 데이터 적재 및 배치 예측 완료")