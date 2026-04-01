# Telco Churn Frontend Template

React + Vite 기반의 텔코 고객 이탈 예측 프론트엔드 코드 틀입니다.

## 반영된 기준
- `customer_id`는 프론트 입력값이 아님
- 백엔드가 신규 고객 ID를 자동 생성
- `POST /customers/predict` 호출 시 실제 고객 raw 데이터만 전송
- `GET /predictions/high-risk`로 고위험 고객 목록 조회
- Base URL: `https://interplacental-liana-puddly.ngrok-free.dev`

## 실행 방법
```bash
npm install
cp .env.example .env
npm run dev
```

## 주요 파일
- `src/pages/PredictionPage.jsx`: 예측 입력/결과 페이지
- `src/pages/HighRiskPage.jsx`: 고위험 고객 목록 페이지
- `src/components/PredictionForm.jsx`: 입력 폼
- `src/api/predictionApi.js`: API 호출 함수
- `src/utils/payloadMapper.js`: payload 변환 및 간단 검증

## 참고
배포된 백엔드의 실제 요청/응답 형식이 추가로 바뀌면,
`src/utils/payloadMapper.js`와 `src/components/HighRiskTable.jsx`를 먼저 수정하면 됩니다.
