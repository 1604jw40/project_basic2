# project_basic2 · 통신사 고객 이탈 예측

고객 정보를 입력하면 이탈 위험 점수와 분류 결과를 반환하는 웹 프로젝트입니다. React 프론트엔드, FastAPI 백엔드·모델 API, MariaDB로 구성됩니다.

## 기능과 구조

- 프론트엔드: 고객 입력, 예측 결과 표시, 고위험 고객 목록 조회
- 백엔드: 신규 고객 ID 생성, 고객·예측 결과 저장, 모델 API 호출
- 모델 API: 저장된 모델 번들의 전처리·스케일러·임계값을 사용해 추론
- MariaDB: 고객 원본 필드와 예측 이력 저장

```text
React (5173) → Backend API (8000) → MariaDB (컨테이너 3306 / 호스트 3307)
                                → Model API (8001) → 모델 번들
```

```text
project_basic2/
├── backend/app/          # API, DB 연결, 고객/예측 저장
├── frontend/src/         # React 페이지, 컴포넌트, API 클라이언트
├── model_api/app/        # 추론 API와 모델 로더
├── model/
│   ├── artifacts/       # model_v1.joblib
│   ├── notebooks/       # 모델 개발 노트북
│   └── src/             # 전처리
├── database/
│   ├── init/            # Docker DB 최초 초기화 SQL
│   └── sql/             # 개별 DB 구성/적재 SQL
├── data/                # raw / processed 데이터
├── scripts/             # 데이터 적재, 배치 추론, DB 확인
├── docs/api.md
├── docker-compose.yml
├── .env.example
└── requirements.txt
```

## 시작 전 확인

- Docker Engine/Desktop와 Docker Compose v2가 필요합니다. API 컨테이너는 Python 3.10, DB는 MariaDB 11을 사용합니다.
- 프론트엔드는 별도로 실행합니다. Vite 5에 맞는 Node.js 18 이상과 npm이 필요합니다.
- 추론에는 `model/artifacts/model_v1.joblib`이 필요합니다. 신뢰할 수 없는 joblib 파일을 로드하지 마세요.
- 현재 Compose와 초기화 스크립트에는 개발용 DB 인증정보가 직접 설정되어 있습니다. 운영 환경에 그대로 노출하지 말고, 운영 전 비밀정보 분리와 인증정보 교체가 필요합니다. 루트 `.env`만 바꿔도 Compose의 고정값이 바뀌는 구조는 아닙니다.
- 실제 비밀번호·키·`.env`·개인 고객 데이터는 커밋하지 마세요. 기존 CSV나 모델을 재배포할 때도 출처·이용 조건을 확인해야 합니다.

## 1. API와 DB 실행

저장소 루트에서 실행합니다.

```bash
git clone https://github.com/1604jw40/project_basic2.git
cd project_basic2
docker compose up --build db model_api backend
```

**서비스 이름을 생략하지 마세요.** 전체 `docker compose up`은 `init_data`까지 실행할 수 있습니다. 해당 서비스는 기존 고객·예측·ID 시퀀스 데이터를 삭제하고 CSV로 다시 채웁니다.

새 DB 볼륨에서는 `database/init/00_init.sql`로 테이블을 만듭니다. 기존 볼륨에는 초기화 SQL이 자동 재적용되지 않습니다. DB 준비가 끝난 뒤 다음 주소를 확인하세요.

| 대상 | 주소 |
| --- | --- |
| Backend Swagger | http://localhost:8000/docs |
| Backend 상태 | http://localhost:8000/health |
| Model Swagger | http://localhost:8001/docs |
| Model 상태 | http://localhost:8001/health |

`/health`는 간단한 상태 응답이며 DB 연결과 전체 예측 흐름을 보증하지 않습니다. 서비스 준비 문제는 `docker compose logs db model_api backend`로 확인하세요.

일반 종료는 `docker compose stop`을 사용합니다. `docker compose down -v`는 DB 볼륨까지 삭제하므로 일반 시작·종료 절차에 사용하지 마세요.

## 2. 프론트엔드 실행

`frontend/.env.local` 파일을 만들고 아래 값을 지정합니다. 현재 API 클라이언트에는 외부 개발용 URL 기본값이 있으므로 로컬 테스트 때 명시적으로 덮어써야 합니다.

```dotenv
VITE_API_BASE_URL=http://localhost:8000
```

```bash
cd frontend
npm ci
npm run dev
```

http://localhost:5173 에서 확인합니다. 빌드 명령은 `npm run build`입니다. 환경변수를 바꾼 뒤에는 개발 서버를 다시 시작하거나 배포 빌드를 다시 만들어야 합니다. `VITE_` 변수는 브라우저에 공개되므로 비밀정보를 넣지 마세요.

## 3. Python API 로컬 개발 (선택)

Docker API 대신 로컬 Python으로 실행할 때 사용합니다. DB와 테이블은 먼저 준비해야 합니다. 아래 명령은 저장소 루트 기준입니다.

```bash
python -m venv .venv
# macOS / Linux
source .venv/bin/activate
# Windows PowerShell에서는 .\.venv\Scripts\Activate.ps1 사용
python -m pip install -r requirements.txt
```

루트 `.env.example`을 `.env`로 복사하고 다음 항목을 실제 로컬 DB에 맞게 설정합니다.

| 변수 | 용도 |
| --- | --- |
| `DB_HOST`, `DB_PORT` | DB 접속 주소·포트. Compose DB에 호스트에서 접속하면 `127.0.0.1:3307` |
| `DB_USER`, `DB_PASSWORD`, `DB_NAME` | DB 계정·비밀번호·데이터베이스 |
| `MODEL_API_URL` | 로컬 모델 API 주소 `http://127.0.0.1:8001` |

가상환경을 활성화한 터미널 두 개에서 각각 실행합니다. Docker API가 같은 포트를 사용 중이면 먼저 해당 API 서비스를 중지하세요.

```bash
python -m uvicorn model_api.app.main:app --host 127.0.0.1 --port 8001 --reload
```

```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

## API

| 서비스 | 메서드·경로 | 내용 |
| --- | --- | --- |
| Backend | `POST /customers/predict` | 고객 입력 저장, ID 자동 생성, 모델 호출, 예측 저장·반환 |
| Backend | `GET /predictions/high-risk` | 최신 예측 기준 고위험 고객 조회 |
| Backend / Model | `GET /health` | 상태 응답 |
| Model | `POST /predict` | 고객 데이터 추론 |

프론트엔드는 Backend API를 호출하며 신규 요청에 `customer_id`를 보내지 않습니다. 요청 필드와 타입은 실행 중인 `/docs` 및 `backend/app/schemas.py`를 확인하세요. 예측 결과에는 `customer_id`, `score`, `threshold`, `prediction_label`이 포함됩니다.

## 데이터 적재·배치 처리 주의사항

- `scripts/init_data.py` / Compose `init_data`: **기존 고객·예측·ID 시퀀스를 삭제**하고 `data/raw/telco-customer.csv`를 적재한 뒤 배치 예측합니다. 빈 개발 DB에서 의도적으로 초기화할 때만 검토하여 실행하세요. 기존 데이터가 있으면 먼저 백업해야 합니다.
- `scripts/run_batch_prediction.py`: 기존 고객 전체를 읽고 예측 행을 추가합니다. 반복 실행하면 예측 이력이 추가되므로 읽기 전용 점검용으로 실행하지 마세요.
- `database/sql/`의 개별 적재 SQL은 CSV 경로와 실행 환경을 확인해야 합니다. Docker 최초 테이블 구성은 `database/init/`과 구분됩니다.

## 현재 제약과 검증 범위

- Python 의존성 버전이 고정되어 있지 않아 모델을 저장한 환경과 호환성을 확인해야 합니다.
- Backend CORS는 전체 허용이 아니라 `backend/app/main.py`에 지정된 프론트 주소 목록을 사용합니다. 다른 주소로 실행·배포하면 허용 목록을 점검하세요.
- 현재 API 라우트에는 인증·인가 처리가 구현되어 있지 않습니다. 공개 운영 전 접근 제어, 비밀정보 관리, 오류 응답 및 DB 포트 노출을 점검해야 합니다.
- 모델 점수는 예측 결과이며 검증된 운영 성능을 뜻하지 않습니다. 이 문서에서는 정확도나 일반화 성능을 보장하지 않습니다.
- 이 README는 저장소의 소스·설정과 대조하여 정리했습니다. Docker 실행, DB 적재, 실제 모델 추론, 프론트 빌드의 통합 동작은 이 문서 변경 과정에서 실행 검증하지 않았습니다.
