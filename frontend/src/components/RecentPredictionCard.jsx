import StatusBadge from './StatusBadge';

export default function RecentPredictionCard({ item }) {
  if (!item) {
    return (
      <section className="card summary-card muted-card">
        <p className="section-kicker">최근 예측</p>
        <h2>최근 예측 결과</h2>
        <p>아직 저장된 예측 결과가 없습니다.</p>
      </section>
    );
  }

  const savedAt = item.savedAt ? new Date(item.savedAt).toLocaleString() : '-';

  return (
    <section className="card summary-card">
      <div className="card-header-row">
        <div>
          <p className="section-kicker">최근 예측</p>
          <h2>최근 예측 결과</h2>
        </div>
        <StatusBadge predictionLabel={item.prediction_label} />
      </div>
      <div className="mini-stat-grid compact-top">
        <div>
          <span className="meta-label">고객 ID</span>
          <strong>{item.customer_id}</strong>
        </div>
        <div>
          <span className="meta-label">이탈 점수</span>
          <strong>{Number(item.score).toFixed(4)}</strong>
        </div>
        <div>
          <span className="meta-label">판단 기준값</span>
          <strong>{Number(item.threshold).toFixed(4)}</strong>
        </div>
        <div>
          <span className="meta-label">저장 시각</span>
          <strong>{savedAt}</strong>
        </div>
      </div>
    </section>
  );
}
