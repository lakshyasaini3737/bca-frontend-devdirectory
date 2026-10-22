export default function SkeletonLoader({ count = 6 }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card skeleton-card">
          <div className="sk sk-circle" />
          <div className="sk sk-line" />
          <div className="sk sk-line short" />
          <div className="sk sk-line" />
        </div>
      ))}
    </div>
  );
}