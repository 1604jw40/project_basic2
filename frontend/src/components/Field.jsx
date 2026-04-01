export default function Field({ label, error, children, hint, required = false }) {
  return (
    <label className="field-wrapper">
      <span className="field-label">
        {label}
        {required ? <span className="required-mark"> *</span> : null}
      </span>
      {children}
      {hint ? <span className="field-hint">{hint}</span> : null}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
