import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Telecom Customer Churn Prediction Project</p>
          <h1>텔코 이탈 예측 프론트엔드</h1>
          <p className="subtext">React + FastAPI + Model API 연동 데모</p>
        </div>
        <nav className="nav-tabs">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Prediction
          </NavLink>
          <NavLink to="/high-risk" className={({ isActive }) => (isActive ? 'active' : '')}>
            High-Risk List
          </NavLink>
        </nav>
      </header>
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
