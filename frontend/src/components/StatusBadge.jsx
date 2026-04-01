export default function StatusBadge({ predictionLabel }) {
  const isHighRisk = Number(predictionLabel) === 1;
  return (
    <span className={`status-badge ${isHighRisk ? 'danger' : 'safe'}`}>
<<<<<<< HEAD
      {isHighRisk ? '이탈 위험' : '유지 예상'}
=======
      {isHighRisk ? 'High Risk' : 'Non-Risk'}
>>>>>>> 4523a0d1596787f772943c7a86dec937ab52ccd0
    </span>
  );
}
