export default function LoadingSpinner({ text = '불러오는 중...' }) {
  return (
    <div className="loading-box" role="status" aria-live="polite">
      <div className="spinner" />
      <span>{text}</span>
    </div>
  );
}
