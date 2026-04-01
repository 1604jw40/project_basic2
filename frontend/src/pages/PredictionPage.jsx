import { useMemo, useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import ResultCard from '../components/ResultCard';
import ErrorMessage from '../components/ErrorMessage';
import { predictCustomer } from '../api/predictionApi';
import { defaultFormValues } from '../utils/defaultFormValues';
import { normalizePayload, validateForm } from '../utils/payloadMapper';
import { saveRecentPrediction } from '../utils/recentPrediction';
import RiskLevelDashboard from '../components/RiskLevelDashboard';

const INTERNET_RELATED_FIELDS = [
  'online_security',
  'online_backup',
  'device_protection',
  'tech_support',
  'streaming_tv',
  'streaming_movies',
];

export default function PredictionPage() {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const summaryText = useMemo(() => {
    if (!result) return '고객 데이터를 입력하고 예측 버튼을 눌러주세요.';
    return `최신 예측 고객: ${result.customer_id}`;
  }, [result]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((prev) => {
      const next = { ...prev, [name]: value };

      if (name === 'internet_service') {
        if (value === 'No') {
          INTERNET_RELATED_FIELDS.forEach((field) => {
            next[field] = 'No internet service';
          });
        } else {
          INTERNET_RELATED_FIELDS.forEach((field) => {
            if (next[field] === 'No internet service') {
              next[field] = 'No';
            }
          });
        }
      }

      return next;
    });

    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError('');
  }

  function handleReset() {
    setFormValues(defaultFormValues);
    setResult(null);
    setFormErrors({});
    setServerError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setServerError('입력값을 다시 확인해주세요. 필수값 또는 범위 조건이 맞지 않습니다.');
      return;
    }

    try {
      setLoading(true);
      setServerError('');
      const payload = normalizePayload(formValues);
      const data = await predictCustomer(payload);
      setResult(data);
      saveRecentPrediction(data);
    } catch (error) {
      const detail = error?.response?.data?.detail;
      const message =
        typeof detail === 'string'
          ? detail
          : detail
            ? JSON.stringify(detail)
            : error.message || '예측 요청 중 오류가 발생했습니다.';
      setServerError(String(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-grid prediction-layout">
      <div>
        <PredictionForm
          values={formValues}
          errors={formErrors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          onReset={handleReset}
        />
      </div>
      <div className="sticky-column">
        <section className="card summary-card guide-card">
          <p className="section-kicker">안내</p>
          <h2>사용 안내</h2>
          <p>{summaryText}</p>
          <ul className="simple-list">
            <li>고객 ID는 백엔드가 자동 생성합니다.</li>
            <li>필수값 누락 시 폼에서 바로 경고를 표시합니다.</li>
            <li>인터넷 없음 선택 시 부가서비스가 자동 비활성화됩니다.</li>
            <li>계약 유형은 드롭다운 단일 선택 방식입니다.</li>
          </ul>
        </section>
        <ErrorMessage message={serverError} />
        <RiskLevelDashboard result={result} />
        <ResultCard result={result} />
      </div>
    </div>
  );
}
