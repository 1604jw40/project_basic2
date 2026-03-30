# project_basic2

## 1. 프로젝트 개요

통신사 고객 raw 데이터를 입력받아 이탈 위험 여부를 예측하는 시스템입니다.

- Backend API: 입력 수신, DB 저장, Model API 호출, 결과 반환
- Model API: 전처리, 스케일링, 예측 수행
- MariaDB: 원본 고객 데이터 및 예측 결과 저장

## 2. 시스템 구조

Frontend -> Backend API -> MariaDB
                     \-> Model API

## 3. 디렉토리 구조

text
project_basic2/
├─ backend/
│  └─ app/
├─ model_api/
│  └─ app/
├─ model/
│  ├─ artifacts/
│  ├─ notebooks/
│  └─ src/
├─ database/
│  └─ sql/
├─ data/
│  ├─ raw/
│  └─ processed/
├─ scripts/
├─ docs/
├─ .env.example
├─ requirements.txt
└─ readme.md

## 4. 실행 환경

md id="k0v3zt"
- Python 3.9 이상
- FastAPI
- MariaDB
- XGBoost
- scikit-learn
- macOS / Windows 로컬 환경에서 실행 가능

## 5. 로컬 실행 방법

### 1. 가상환경 활성화
source .venv/bin/activate

### 2. model_api 실행
python -m uvicorn model_api.app.main:app --host 127.0.0.1 --port 8001 --reload --reload-dir model_api --reload-dir model

### 3. backend 실행
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload --reload-dir backend

## 6. API 명세

### POST /customers/predict
신규 고객 raw 데이터를 받아 customer_id를 자동 생성하고 예측 결과를 반환합니다.

### GET /predictions/high-risk
최신 예측 기준 위험군 고객 목록을 반환합니다.

### GET /health
서버 상태 확인용 엔드포인트입니다.

## 7. DB 초기화 방법

MariaDB에서 sql 순서로 실행합니다.

주의:
- CSV 경로는 운영체제에 맞게 수정해야 합니다.
- macOS에서는 `LOAD DATA LOCAL INFILE` 사용을 권장합니다.

## 8. 배치 예측 실행 방법

기존 고객 전체에 대한 초기 예측 결과를 생성하려면 아래 명령을 실행합니다.

bash
source .venv/bin/activate
python scripts/run_batch_prediction.py

## 9. 프론트 연동 방법

md id="hy7cah"
프론트는 아래 두 API를 사용합니다.

- `POST /customers/predict`
- `GET /predictions/high-risk`

`POST /customers/predict` 요청 시 `customer_id`는 보내지 않습니다.
백엔드가 자동으로 `NEW_000001` 형식의 ID를 생성합니다.

## 10. 배포 시 고려사항

- 로컬 실행 시 `MODEL_API_URL=http://127.0.0.1:8001`
- Docker/배포 환경에서는 `MODEL_API_URL`을 배포된 model_api 주소로 변경해야 합니다.
- CORS는 현재 개발용으로 전체 허용(`*`) 상태이며, 배포 시 프론트 주소만 허용하도록 제한하는 것이 좋습니다.
- 팀원 공유용으로는 ngrok 또는 정식 배포 URL을 사용할 수 있습니다.