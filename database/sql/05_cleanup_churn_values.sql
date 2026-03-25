UPDATE customers_raw
SET churn = TRIM(REPLACE(churn, '\r', ''));