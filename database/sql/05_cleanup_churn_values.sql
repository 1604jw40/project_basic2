USE telco_churn_db;

UPDATE customers_raw
SET churn = TRIM(REPLACE(churn, '\r', ''));