export default function AlertBanner({ type = 'error', message, onRetry, onClose }) {
  if (!message) return null;
  return (
    <div className={`alert alert-${type}`} role="alert">
      <span>{message}</span>
      <span className="alert-actions">
        {onRetry && <button className="btn btn-sm" onClick={onRetry}>Retry</button>}
        {onClose && <button className="btn btn-sm btn-ghost" onClick={onClose} aria-label="Dismiss">✕</button>}
      </span>
    </div>
  );
}