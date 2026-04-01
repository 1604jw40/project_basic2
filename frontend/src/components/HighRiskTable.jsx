import { useState } from 'react';
import { getRiskLevel, getRiskClass } from '../utils/riskLevel';

const COLLAPSED_COUNT = 5;

export default function HighRiskTable({ items, emptyMessage = '현재 조회된 고위험 고객이 없습니다.' }) {
  const [expanded, setExpanded] = useState(false);

  if (!items.length) {
    return (
      <div className="card empty-card">
        <div className="empty-icon">📋</div>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const needsCollapse = items.length > COLLAPSED_COUNT;
  const visibleItems = expanded ? items : items.slice(0, COLLAPSED_COUNT);
  const hiddenCount = items.length - COLLAPSED_COUNT;

  return (
    <div className="card table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>고객 ID</th>
              <th>이탈 점수</th>
              <th>판단 기준값</th>
              <th>위험 등급</th>
              <th>생성일시</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item, index) => {
              const threshold = item.threshold_value ?? item.threshold;
              const level = getRiskLevel(item.score, threshold);
              const cls = getRiskClass(item.score, threshold);
              return (
                <tr key={`${item.customer_id}-${index}`}>
                  <td>{item.customer_id}</td>
                  <td>{Number(item.score).toFixed(4)}</td>
                  <td>{Number(threshold).toFixed(4)}</td>
                  <td>
                    <span className={`risk-badge risk-${cls}`}>{level}</span>
                  </td>
                  <td>{item.created_at ?? '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {needsCollapse && (
        <div className="table-toggle-row">
          <button
            type="button"
            className="table-toggle-btn"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded
              ? '접기'
              : `나머지 ${hiddenCount}건 더 보기`}
            <span className={`toggle-chevron ${expanded ? 'up' : ''}`}>▾</span>
          </button>
        </div>
      )}
    </div>
  );
}
