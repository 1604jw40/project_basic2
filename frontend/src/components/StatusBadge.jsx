export default function StatusBadge({ predictionLabel }) {
  const isHighRisk = Number(predictionLabel) === 1;
  return (
    <span className={`status-badge ${isHighRisk ? 'danger' : 'safe'}`}>
      {isHighRisk ? '이탈 위험' : '유지 예상'}
    </span>
  );
}
