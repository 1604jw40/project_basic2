import { useEffect, useMemo, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import HighRiskTable from '../components/HighRiskTable';
import LoadingSpinner from '../components/LoadingSpinner';
import RecentPredictionCard from '../components/RecentPredictionCard';
import { fetchHighRiskCustomers } from '../api/predictionApi';
import { loadRecentPrediction } from '../utils/recentPrediction';

export default function HighRiskPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [recentPrediction, setRecentPrediction] = useState(null);

  async function loadData() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchHighRiskCustomers();
      setItems(Array.isArray(data) ? data : []);
      setRecentPrediction(loadRecentPrediction());
    } catch (err) {
      const message = err?.response?.data?.detail || err.message || '목록 조회 중 오류가 발생했습니다.';
      setError(String(message));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    const searched = keyword
      ? items.filter((item) => String(item.customer_id).toLowerCase().includes(keyword))
      : items;

    const sorted = [...searched].sort((a, b) => {
      const diff = Number(a.score) - Number(b.score);
      return sortOrder === 'asc' ? diff : -diff;
    });

    return sorted;
  }, [items, searchTerm, sortOrder]);

  const averageScore = useMemo(() => {
    if (!items.length) return 0;
    const total = items.reduce((sum, item) => sum + Number(item.score || 0), 0);
    return total / items.length;
  }, [items]);

  return (
    <div className="stack-gap">
      <section className="card toolbar-card">
        <div>
          <p className="section-kicker">고위험 고객</p>
          <h2>고위험 고객 목록</h2>
          <p>고위험 고객 총 건수와 평균 점수를 빠르게 확인할 수 있습니다.</p>
        </div>
        <button className="primary-btn" onClick={loadData} disabled={loading}>
          새로고침
        </button>
      </section>

      <section className="stats-grid">
        <div className="card stat-card">
          <span className="meta-label">고위험 고객 총 건수</span>
          <strong>{items.length}건</strong>
        </div>
        <div className="card stat-card">
          <span className="meta-label">고위험 고객 평균 이탈 점수</span>
          <strong>{averageScore.toFixed(4)}</strong>
        </div>
      </section>

      <RecentPredictionCard item={recentPrediction} />

      <section className="card filter-card">
        <div className="filter-grid">
          <label className="field-wrapper">
            <span className="field-label">고객 ID 검색</span>
            <input
              type="text"
              placeholder="예: NEW_000002 또는 7216-EWTRS"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          <label className="field-wrapper compact-select">
            <span className="field-label">이탈 점수 정렬</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="desc">높은 순</option>
              <option value="asc">낮은 순</option>
            </select>
          </label>
        </div>
      </section>

      <ErrorMessage message={error} />
      {loading ? (
        <LoadingSpinner text="고위험 고객 목록 불러오는 중..." />
      ) : (
        <HighRiskTable items={filteredItems} emptyMessage="검색 조건에 맞는 고위험 고객이 없습니다." />
      )}
    </div>
  );
}
