import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="card empty-state notfound">
      <h1 className="gradient-text">404</h1>
      <h3>Lost in the codebase</h3>
      <p className="muted">The page you are looking for doesn't exist or was moved.</p>
      <Link to="/" className="btn btn-primary">← Back to home</Link>
    </div>
  );
}
