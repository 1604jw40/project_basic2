import StatusBadge from './StatusBadge';

export default function HighRiskTable({ items, emptyMessage = '현재 조회된 고위험 고객이 없습니다.' }) {
  if (!items.length) {
    return (
      <div className="card empty-card">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="card table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Score</th>
              <th>Threshold</th>
              <th>Label</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`${item.customer_id}-${index}`}>
                <td>{item.customer_id}</td>
                <td>{Number(item.score).toFixed(4)}</td>
                <td>{Number(item.threshold_value ?? item.threshold).toFixed(4)}</td>
                <td>
                  <StatusBadge predictionLabel={item.prediction_label} />
                </td>
                <td>{item.created_at ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
