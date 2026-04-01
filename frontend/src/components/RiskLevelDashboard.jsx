import { getRiskLevel, isThresholdExceeded } from '../utils/riskLevel';

const LEVELS = [
  { key: '안전', label: '안전', sub: '이탈 가능성 낮음', cls: 'level-low' },
  { key: '위험', label: '위험', sub: '이탈 주의 필요', cls: 'level-mid' },
  { key: '매우 위험', label: '매우 위험', sub: '이탈 가능성 높음', cls: 'level-high' },
];

export default function RiskLevelDashboard({ result }) {
  if (!result) {
    return (
      <section className="card summary-card muted-card">
        <p className="section-kicker">위험도</p>
        <h2>이탈 위험도 대시보드</h2>
        <p>예측 결과가 생성되면 위험 등급이 표시됩니다.</p>
      </section>
    );
  }

  const currentLevel = getRiskLevel(result.score, result.threshold);
  const exceeded = isThresholdExceeded(result.score, result.threshold);

  return (
    <section className="card summary-card">
      <p className="section-kicker">위험도</p>
      <h2>이탈 위험도 대시보드</h2>
      <p className="helper-text">
        안전: 이탈 점수 &lt; 기준값 · 위험: 기준값 ≤ 이탈 점수 &lt; 0.75 · 매우 위험: 이탈 점수 ≥ 0.75
      </p>

      <div className="risk-level-grid">
        {LEVELS.map((level) => (
          <div
            key={level.key}
            className={`risk-level-card ${level.cls} ${currentLevel === level.key ? 'active' : ''}`}
          >
            <span className="meta-label">{level.sub}</span>
            <strong>{level.label}</strong>
          </div>
        ))}
      </div>

      <div className="mini-stat-grid compact-top">
        <div>
          <span className="meta-label">이탈 점수</span>
          <strong>{Number(result.score).toFixed(4)}</strong>
        </div>
        <div>
          <span className="meta-label">판단 기준값</span>
          <strong>{Number(result.threshold).toFixed(4)}</strong>
        </div>
        <div>
          <span className="meta-label">기준값 초과 여부</span>
          <strong>{exceeded ? '초과' : '미초과'}</strong>
        </div>
        <div>
          <span className="meta-label">판단 등급</span>
          <strong>{currentLevel}</strong>
        </div>
      </div>
    </section>
  );
}
