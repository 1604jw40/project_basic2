import { getRiskLevel, isThresholdExceeded } from '../utils/riskLevel';

<<<<<<< HEAD
const LEVELS = [
  { key: '안전', label: '안전', sub: '이탈 가능성 낮음', cls: 'level-low' },
  { key: '위험', label: '위험', sub: '이탈 주의 필요', cls: 'level-mid' },
  { key: '매우 위험', label: '매우 위험', sub: '이탈 가능성 높음', cls: 'level-high' },
];
=======
const LEVELS = ['낮음', '보통', '높음'];
>>>>>>> 4523a0d1596787f772943c7a86dec937ab52ccd0

export default function RiskLevelDashboard({ result }) {
  if (!result) {
    return (
      <section className="card summary-card muted-card">
<<<<<<< HEAD
        <p className="section-kicker">위험도</p>
        <h2>이탈 위험도 대시보드</h2>
        <p>예측 결과가 생성되면 위험 등급이 표시됩니다.</p>
=======
        <p className="section-kicker">Risk Dashboard</p>
        <h2>이탈 위험도 대시보드</h2>
        <p>예측 결과가 생성되면 낮음 / 보통 / 높음 카드가 활성화됩니다.</p>
>>>>>>> 4523a0d1596787f772943c7a86dec937ab52ccd0
      </section>
    );
  }

  const currentLevel = getRiskLevel(result.score, result.threshold);
  const exceeded = isThresholdExceeded(result.score, result.threshold);

  return (
    <section className="card summary-card">
<<<<<<< HEAD
      <p className="section-kicker">위험도</p>
      <h2>이탈 위험도 대시보드</h2>
      <p className="helper-text">
        안전: 이탈 점수 &lt; 기준값 · 위험: 기준값 ≤ 이탈 점수 &lt; 0.75 · 매우 위험: 이탈 점수 ≥ 0.75
=======
      <p className="section-kicker">Risk Dashboard</p>
      <h2>이탈 위험도 대시보드</h2>
      <p>
        현재 예측 결과를 기준으로 위험 등급을 카드 형태로 표시합니다. 기준: 낮음 &lt; threshold,
        보통 = threshold 이상 ~ 0.75 미만, 높음 = 0.75 이상
>>>>>>> 4523a0d1596787f772943c7a86dec937ab52ccd0
      </p>

      <div className="risk-level-grid">
        {LEVELS.map((level) => (
<<<<<<< HEAD
          <div
            key={level.key}
            className={`risk-level-card ${level.cls} ${currentLevel === level.key ? 'active' : ''}`}
          >
            <span className="meta-label">{level.sub}</span>
            <strong>{level.label}</strong>
=======
          <div key={level} className={`risk-level-card ${currentLevel === level ? 'active' : ''}`}>
            <span className="meta-label">위험 등급</span>
            <strong>{level}</strong>
>>>>>>> 4523a0d1596787f772943c7a86dec937ab52ccd0
          </div>
        ))}
      </div>

      <div className="mini-stat-grid compact-top">
        <div>
<<<<<<< HEAD
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
=======
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
>>>>>>> 4523a0d1596787f772943c7a86dec937ab52ccd0
          <strong>{currentLevel}</strong>
        </div>
      </div>
    </section>
  );
}
