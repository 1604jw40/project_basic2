const STORAGE_KEY = 'telco_recent_prediction';

export function saveRecentPrediction(result) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...result,
    savedAt: new Date().toISOString(),
  }));
}

export function loadRecentPrediction() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
