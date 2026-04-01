import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="header-titles">
            <h1>고객 이탈 예측</h1>
            <p className="header-sub">React + FastAPI + ML Model</p>
          </div>
        </div>
        <nav className="nav-tabs">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            예측하기
          </NavLink>
          <NavLink to="/high-risk" className={({ isActive }) => (isActive ? 'active' : '')}>
            고위험 고객 목록
          </NavLink>
        </nav>
      </header>
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
