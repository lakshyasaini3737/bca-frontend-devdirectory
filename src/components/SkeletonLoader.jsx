export default function SkeletonLoader({ variant = 'card', count = 6 }) {
  if (variant === 'post') {
    return (
      <div className="stack" aria-busy="true" aria-label="Loading posts">
        {Array.from({ length: count }).map((_, i) => (
          <div className="card skeleton-box" key={i}>
            <div className="skeleton sk-line w60" />
            <div className="skeleton sk-line" />
            <div className="skeleton sk-line w80" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'stat') {
    return (
      <div className="stats-grid" aria-busy="true" aria-label="Loading stats">
        {Array.from({ length: count }).map((_, i) => (
          <div className="card skeleton-box" key={i}>
            <div className="skeleton sk-line w40" />
            <div className="skeleton sk-big" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="user-grid" aria-busy="true" aria-label="Loading developers">
      {Array.from({ length: count }).map((_, i) => (
        <div className="card skeleton-box" key={i}>
          <div className="skeleton sk-avatar" />
          <div className="skeleton sk-line w60" />
          <div className="skeleton sk-line w40" />
          <div className="skeleton sk-line w80" />
        </div>
      ))}
    </div>
  );
}
