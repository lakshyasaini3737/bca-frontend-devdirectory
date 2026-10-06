import { useEffect, useState } from 'react';

const ICONS = { error: '⚠️', success: '✅', info: 'ℹ️' };

export default function AlertBanner({ type = 'error', message, onRetry, onDismiss }) {
  const [hidden, setHidden] = useState(false);

  // Show again whenever a new message arrives.
  useEffect(() => setHidden(false), [message]);

  if (hidden || !message) return null;

  const dismiss = () => {
    setHidden(true);
    onDismiss?.();
  };

  return (
    <div className={`alert alert-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <span className="alert-icon" aria-hidden="true">{ICONS[type]}</span>
      <p className="alert-text">{message}</p>
      <div className="alert-actions">
        {onRetry && (
          <button type="button" className="btn btn-sm btn-ghost" onClick={onRetry}>
            ↻ Retry
          </button>
        )}
        <button type="button" className="alert-close" onClick={dismiss} aria-label="Dismiss">
          ✕
        </button>
      </div>
    </div>
  );
}
