import StatusBadge from './StatusBadge';

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <section className="card result-card">
      <div className="card-header-row">
        <div>
          <p className="section-kicker">Prediction Result</p>
          <h2>예측 결과</h2>
        </div>
        <StatusBadge predictionLabel={result.prediction_label} />
      </div>

      <div className="result-grid">
        <div>
          <span className="meta-label">Customer ID</span>
          <strong>{result.customer_id}</strong>
        </div>
        <div>
          <span className="meta-label">Score</span>
          <strong>{Number(result.score).toFixed(4)}</strong>
        </div>
        <div>
          <span className="meta-label">Threshold</span>
          <strong>{Number(result.threshold).toFixed(4)}</strong>
        </div>
        <div>
          <span className="meta-label">Prediction Label</span>
          <strong>{result.prediction_label}</strong>
        </div>
      </div>
    </section>
  );
}
