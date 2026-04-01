import os
import pymysql
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

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
    csv_path = "data/raw/telco-customer.csv"
    df = pd.read_csv(csv_path)

    print("CSV columns:", df.columns.tolist())

    # 원본 CSV 컬럼명 기준
    df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")

    conn = get_connection()

    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM customers_raw")

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

    except Exception as e:
        conn.rollback()
        print("오류:", e)
        raise

    finally:
        conn.close()

if __name__ == "__main__":
    main()