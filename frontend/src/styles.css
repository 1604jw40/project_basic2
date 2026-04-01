/* ============================================================
   Telco Churn Prediction — Admin Dashboard Theme
   Aesthetic: Clean modern dashboard (Linear / Vercel inspired)
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap');

:root {
  /* --- palette --- */
  --bg-base: #f7f8fa;
  --bg-surface: #ffffff;
  --bg-elevated: #ffffff;
  --bg-inset: #f0f2f5;
  --bg-header: rgba(255, 255, 255, 0.82);

  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-tertiary: #9ca3af;
  --text-inverse: #ffffff;

  --border-default: #e5e7eb;
  --border-light: #f0f1f3;

  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --accent-bg: #eff6ff;
  --accent-text: #1e40af;

  --danger: #dc2626;
  --danger-bg: #fef2f2;
  --danger-border: #fecaca;
  --danger-text: #991b1b;

  --success: #059669;
  --success-bg: #ecfdf5;
  --success-text: #065f46;

  --warning: #d97706;
  --warning-bg: #fffbeb;
  --warning-text: #92400e;

  /* --- shadows --- */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.08);
  --shadow-card: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);

  /* --- radii --- */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* --- typography --- */
  --font-sans: 'Plus Jakarta Sans', -apple-system, 'Malgun Gothic', sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;
}

/* ---- RESET ---- */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg-base); color: var(--text-primary); font-family: var(--font-sans); line-height: 1.6; -webkit-font-smoothing: antialiased; min-width: 320px; }
button, input, select { font: inherit; }
button { cursor: pointer; }

/* ============================================================
   LAYOUT SHELL
   ============================================================ */
.app-shell {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

/* ---- Header ---- */
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-header);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--border-default);
  margin: 0 -24px;
  padding: 20px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.brand-icon svg {
  width: 22px;
  height: 22px;
  color: white;
}

.header-titles h1 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.header-sub {
  margin: 2px 0 0;
  font-size: 0.8rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

/* ---- Nav tabs ---- */
.nav-tabs {
  display: flex;
  gap: 2px;
  margin-bottom: -1px;
}

.nav-tabs a {
  text-decoration: none;
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-tertiary);
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.nav-tabs a:hover { color: var(--text-secondary); }

.nav-tabs a.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* ---- Page container ---- */
.page-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 28px;
}

/* ============================================================
   GRID LAYOUTS
   ============================================================ */
.page-grid { display: grid; gap: 24px; }

.prediction-layout {
  grid-template-columns: minmax(0, 5fr) minmax(340px, 3fr);
}

.sticky-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 100px;
  align-self: start;
}

/* ============================================================
   CARDS
   ============================================================ */
.card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-card);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card h2 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 700; letter-spacing: -0.01em; }
.card h3 { margin: 0 0 12px; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.section-kicker {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin: 0 0 4px;
  background: var(--accent-bg);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}

.helper-text {
  margin: 4px 0 0;
  font-size: 0.82rem;
  color: var(--text-tertiary);
  line-height: 1.5;
}

/* Summary / stat cards */
.summary-card { position: relative; overflow: hidden; }
.summary-card > p { font-size: 0.88rem; color: var(--text-secondary); margin: 4px 0 0; line-height: 1.55; }

.muted-card {
  background: var(--bg-inset);
  border-style: dashed;
}
.muted-card p { color: var(--text-tertiary); }

/* ============================================================
   STAT CARDS
   ============================================================ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  border-radius: 0 3px 3px 0;
}

.stat-card:first-child::before { background: var(--accent); }
.stat-card:nth-child(2)::before { background: var(--warning); }

.stat-card .meta-label {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
}

.stat-card strong {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-top: 4px;
  display: block;
  font-feature-settings: 'tnum';
}

/* ============================================================
   FORM
   ============================================================ */
.form-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid var(--border-light);
}

.form-section:first-of-type { border-top: none; padding-top: 0; }

.form-section h3 {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-section h3::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: var(--accent);
}

.form-grid { display: grid; gap: 16px; }
.form-grid.three-col { grid-template-columns: repeat(3, 1fr); }

.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.required-mark {
  color: var(--danger);
  font-weight: 700;
}

.field-hint {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.field-error {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--danger);
}

input, select {
  width: 100%;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-default);
  background: var(--bg-surface);
  font-size: 0.88rem;
  color: var(--text-primary);
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}

input:focus, select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

select:disabled, input:disabled {
  background: var(--bg-inset);
  color: var(--text-tertiary);
  cursor: not-allowed;
  border-color: var(--border-light);
}

/* ---- Form actions ---- */
.form-actions {
  display: flex;
  gap: 10px;
  padding-top: 8px;
}

.primary-btn {
  border: 0;
  border-radius: var(--radius-sm);
  padding: 11px 24px;
  font-size: 0.88rem;
  font-weight: 700;
  background: var(--accent);
  color: var(--text-inverse);
  transition: background 0.15s, transform 0.1s;
}

.primary-btn:hover:not(:disabled) {
  background: var(--accent-hover);
}

.primary-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.primary-btn:disabled,
.secondary-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.secondary-btn {
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  padding: 11px 20px;
  font-size: 0.88rem;
  font-weight: 600;
  background: var(--bg-surface);
  color: var(--text-secondary);
  transition: background 0.15s, border-color 0.15s;
}

.secondary-btn:hover:not(:disabled) {
  background: var(--bg-inset);
  border-color: var(--text-tertiary);
}

/* ============================================================
   RESULT CARD
   ============================================================ */
.result-card { }

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 4px;
}

.result-grid > div {
  padding: 12px;
  background: var(--bg-inset);
  border-radius: var(--radius-sm);
}

.result-grid .meta-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
  margin-bottom: 2px;
}

.result-grid strong {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-feature-settings: 'tnum';
}

/* ============================================================
   STATUS BADGE
   ============================================================ */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
}

.status-badge::before {
  content: '';
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.status-badge.danger {
  background: var(--danger-bg);
  color: var(--danger-text);
}
.status-badge.danger::before { background: var(--danger); }

.status-badge.safe {
  background: var(--success-bg);
  color: var(--success-text);
}
.status-badge.safe::before { background: var(--success); }

/* ---- Risk level badges (table inline) ---- */
.risk-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.76rem;
  font-weight: 700;
  white-space: nowrap;
}

.risk-badge::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.risk-badge.risk-safe {
  background: var(--success-bg);
  color: var(--success-text);
}
.risk-badge.risk-safe::before { background: var(--success); }

.risk-badge.risk-warning {
  background: var(--warning-bg);
  color: var(--warning-text);
}
.risk-badge.risk-warning::before { background: var(--warning); }

.risk-badge.risk-critical {
  background: var(--danger-bg);
  color: var(--danger-text);
}
.risk-badge.risk-critical::before { background: var(--danger); }

/* ============================================================
   RISK LEVEL DASHBOARD
   ============================================================ */
.risk-level-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 16px;
}

.risk-level-card {
  padding: 14px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  text-align: center;
  transition: all 0.2s;
  opacity: 0.45;
}

.risk-level-card .meta-label {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
}

.risk-level-card strong {
  display: block;
  font-size: 1.05rem;
  font-weight: 800;
  margin-top: 4px;
}

.risk-level-card.active {
  opacity: 1;
  border-color: transparent;
  box-shadow: var(--shadow-md);
}

.risk-level-card.active.level-low {
  background: var(--success-bg);
  border-color: #a7f3d0;
}
.risk-level-card.active.level-low strong { color: var(--success-text); }

.risk-level-card.active.level-mid {
  background: var(--warning-bg);
  border-color: #fde68a;
}
.risk-level-card.active.level-mid strong { color: var(--warning-text); }

.risk-level-card.active.level-high {
  background: var(--danger-bg);
  border-color: var(--danger-border);
}
.risk-level-card.active.level-high strong { color: var(--danger-text); }

/* Mini stat grid in dashboard */
.mini-stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.compact-top { margin-top: 16px; }

.mini-stat-grid > div {
  padding: 10px 12px;
  background: var(--bg-inset);
  border-radius: var(--radius-sm);
}

.mini-stat-grid .meta-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-tertiary);
  margin-bottom: 1px;
}

.mini-stat-grid strong {
  font-size: 0.92rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

/* ============================================================
   ERROR / LOADING / EMPTY
   ============================================================ */
.error-banner {
  background: var(--danger-bg);
  color: var(--danger-text);
  border: 1px solid var(--danger-border);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}

.error-banner::before {
  content: '⚠';
  font-size: 1rem;
  flex-shrink: 0;
}

.loading-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 20px;
  color: var(--text-tertiary);
  font-weight: 500;
  font-size: 0.88rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2.5px solid var(--border-default);
  border-top-color: var(--accent);
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.empty-card {
  text-align: center;
  color: var(--text-tertiary);
  padding: 48px 24px;
  border-style: dashed;
}

.empty-card .empty-icon {
  font-size: 2rem;
  margin-bottom: 8px;
  opacity: 0.4;
}

.empty-card p {
  margin: 0;
  font-size: 0.9rem;
}

/* ============================================================
   TOOLBAR & FILTERS (High-Risk Page)
   ============================================================ */
.toolbar-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.filter-card { padding: 16px 24px; }

.filter-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(160px, 1fr);
  gap: 14px;
  align-items: end;
}

.compact-select select { max-width: 220px; }

/* ============================================================
   TABLE
   ============================================================ */
.table-card { padding: 0; overflow: hidden; }

.table-wrapper { overflow-x: auto; }

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

thead { background: var(--bg-inset); }

th {
  text-align: left;
  padding: 12px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  border-bottom: 1px solid var(--border-default);
  white-space: nowrap;
}

td {
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

td:first-child {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 0.84rem;
  color: var(--text-primary);
}

td:nth-child(2) {
  font-family: var(--font-mono);
  font-weight: 600;
}

tbody tr { transition: background 0.12s; }
tbody tr:hover { background: var(--bg-inset); }
tbody tr:last-child td { border-bottom: none; }

/* ---- Table collapse toggle ---- */
.table-toggle-row {
  display: flex;
  justify-content: center;
  padding: 12px 16px 16px;
  border-top: 1px solid var(--border-light);
}

.table-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-pill);
  padding: 7px 18px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-surface);
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.table-toggle-btn:hover {
  background: var(--bg-inset);
  border-color: var(--text-tertiary);
  color: var(--text-primary);
}

.toggle-chevron {
  display: inline-block;
  font-size: 0.9em;
  transition: transform 0.2s;
}

.toggle-chevron.up {
  transform: rotate(180deg);
}

/* ============================================================
   GUIDE CARD (Prediction page sidebar)
   ============================================================ */
.guide-card {
  background: linear-gradient(135deg, var(--accent-bg) 0%, #f0f4ff 100%);
  border-color: #dbeafe;
}

.simple-list {
  margin: 12px 0 0;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.simple-list li {
  font-size: 0.82rem;
  color: var(--text-secondary);
  padding-left: 18px;
  position: relative;
  line-height: 1.5;
}

.simple-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.5;
}

/* ============================================================
   UTILITY
   ============================================================ */
.stack-gap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.meta-label {
  font-size: 0.78rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

/* ---- Fade-in animation ---- */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.card { animation: fadeUp 0.35s ease-out both; }
.stack-gap > :nth-child(1) { animation-delay: 0ms; }
.stack-gap > :nth-child(2) { animation-delay: 60ms; }
.stack-gap > :nth-child(3) { animation-delay: 120ms; }
.stack-gap > :nth-child(4) { animation-delay: 180ms; }
.stack-gap > :nth-child(5) { animation-delay: 240ms; }

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1024px) {
  .prediction-layout { grid-template-columns: 1fr 1fr; }
  .form-grid.three-col { grid-template-columns: 1fr 1fr; }
  .sticky-column { position: static; }

  .app-header { flex-direction: column; align-items: flex-start; }
  .toolbar-card { flex-direction: column; }
  .card-header-row { flex-direction: column; }
}

@media (max-width: 720px) {
  .prediction-layout,
  .form-grid.three-col,
  .result-grid,
  .stats-grid,
  .filter-grid,
  .mini-stat-grid,
  .risk-level-grid {
    grid-template-columns: 1fr;
  }

  .app-shell { padding: 0 14px 40px; }
  .app-header { padding: 16px 14px 0; margin: 0 -14px; }
  .nav-tabs a { padding: 8px 14px; font-size: 0.82rem; }
}
