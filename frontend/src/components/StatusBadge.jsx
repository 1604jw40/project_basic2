export default function StatusBadge({ predictionLabel }) {
  const isHighRisk = Number(predictionLabel) === 1;
  return (
    <span className={`status-badge ${isHighRisk ? 'danger' : 'safe'}`}>
      {isHighRisk ? 'High Risk' : 'Non-Risk'}
    </span>
  );
}
