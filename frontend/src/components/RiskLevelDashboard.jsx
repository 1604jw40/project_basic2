import { getRiskLevel, isThresholdExceeded } from '../utils/riskLevel';

const LEVELS = ['낮음', '보통', '높음'];

export default function RiskLevelDashboard({ result }) {
  if (!result) {
    return (
      <section className="card summary-card muted-card">
        <p className="section-kicker">Risk Dashboard</p>
        <h2>이탈 위험도 대시보드</h2>
        <p>예측 결과가 생성되면 낮음 / 보통 / 높음 카드가 활성화됩니다.</p>
      </section>
    );
  }

  const currentLevel = getRiskLevel(result.score, result.threshold);
  const exceeded = isThresholdExceeded(result.score, result.threshold);

  return (
    <section className="card summary-card">
      <p className="section-kicker">Risk Dashboard</p>
      <h2>이탈 위험도 대시보드</h2>
      <p>
        현재 예측 결과를 기준으로 위험 등급을 카드 형태로 표시합니다. 기준: 낮음 &lt; threshold,
        보통 = threshold 이상 ~ 0.75 미만, 높음 = 0.75 이상
      </p>

      <div className="risk-level-grid">
        {LEVELS.map((level) => (
          <div key={level} className={`risk-level-card ${currentLevel === level ? 'active' : ''}`}>
            <span className="meta-label">위험 등급</span>
            <strong>{level}</strong>
          </div>
        ))}
      </div>

      <div className="mini-stat-grid compact-top">
        <div>
          <span className="meta-label">현재 score</span>
          <strong>{Number(result.score).toFixed(4)}</strong>
        </div>
        <div>
          <span className="meta-label">현재 threshold</span>
          <strong>{Number(result.threshold).toFixed(4)}</strong>
        </div>
        <div>
          <span className="meta-label">임계값 초과 여부</span>
          <strong>{exceeded ? '초과' : '미초과'}</strong>
        </div>
        <div>
          <span className="meta-label">현재 판단 등급</span>
          <strong>{currentLevel}</strong>
        </div>
      </div>
    </section>
  );
}
