import os
import pymysql
from dotenv import load_dotenv

load_dotenv()

conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)

try:
    with conn.cursor() as cursor:
        sql = """
        SELECT *
        FROM customers_raw
        WHERE customer_id = %s
        """
        cursor.execute(sql, ("0002-ORFBO",))
        row = cursor.fetchone()
        print(row)
finally:
    conn.close()
    print("DB 연결 종료")