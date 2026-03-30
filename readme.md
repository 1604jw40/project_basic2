backend/app
main.py: 백엔드 API 엔트리포인트
db.py: MariaDB 연결
schemas.py: 요청/응답 스키마
crud.py: DB insert/select 함수
model_client.py: Model API 호출

model_api/app
main.py: 모델 API 엔트리포인트
schemas.py: 모델 입력/출력 스키마
predictor.py: 전처리 + 스케일링 + 예측

model/src
inspect_model.py: 모델 내부 구조 확인
preprocess.py: raw 데이터 → 27개 feature 변환
scripts
test_db_connection.py: DB 연결 테스트
fetch_one_customer.py: 고객 조회 테스트
run_single_prediction.py: 예측 테스트
run_and_save_prediction.py: 예측 후 DB 저장 테스트

python -m uvicorn model_api.app.main:app --host 127.0.0.1 --port 8001 --reload --reload-dir model_api --reload-dir model
