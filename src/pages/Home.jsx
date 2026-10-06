import { Link } from 'react-router-dom';
import AlertBanner from '../components/AlertBanner';
import SkeletonLoader from '../components/SkeletonLoader';
import useFetch from '../hooks/useFetch';
import { getAllPosts, getUsers } from '../services/postService';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { data, loading, error, reload } = useFetch(
    () => Promise.all([getUsers(), getAllPosts()]),
    []
  );

  const users = data?.[0] ?? [];
  const posts = data?.[1] ?? [];
  const companies = new Set(users.map((u) => u.company?.name)).size;
  const cities = new Set(users.map((u) => u.address?.city)).size;

  const stats = [
    { label: 'Developers', value: users.length, icon: '👩‍💻' },
    { label: 'Publications', value: posts.length, icon: '📝' },
    { label: 'Companies', value: companies, icon: '🏢' },
    { label: 'Cities', value: cities, icon: '🌍' },
  ];

  return (
    <>
      <section className="hero">
        <span className="chip chip-glow">✨ Internal Engineering Portal</span>
        <h1>
          Discover your team. <br />
          <span className="gradient-text">Share what you build.</span>
        </h1>
        <p className="hero-sub">
          DevDirectory helps engineering managers find colleagues, explore their
          technical writeups and publish team bulletins — all without a single page reload.
        </p>
        <div className="hero-actions">
          <Link to="/users" className="btn btn-primary btn-lg">Browse Developers →</Link>
          <Link to={isAuthenticated ? '/add-post' : '/login'} className="btn btn-ghost btn-lg">
            ✍️ Publish a Post
          </Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">Platform at a glance</h2>
        {error && <AlertBanner message={error} onRetry={reload} />}
        {loading ? (
          <SkeletonLoader variant="stat" count={4} />
        ) : (
          !error && (
            <div className="stats-grid">
              {stats.map((s) => (
                <div className="card stat-card" key={s.label}>
                  <span className="stat-icon">{s.icon}</span>
                  <p className="muted">{s.label}</p>
                  <p className="stat-value">{s.value}</p>
                </div>
              ))}
            </div>
          )
        )}
      </section>

      <section>
        <h2 className="section-title">Jump to</h2>
        <div className="quick-grid">
          <Link to="/users" className="card quick-card">
            <span>🔎</span>
            <h3>Search developers</h3>
            <p className="muted">Filter instantly by name or company.</p>
          </Link>
          <Link to="/users/1" className="card quick-card">
            <span>📄</span>
            <h3>Read a profile</h3>
            <p className="muted">See details and every post by a developer.</p>
          </Link>
          <Link to="/add-post" className="card quick-card">
            <span>🚀</span>
            <h3>Publish an update</h3>
            <p className="muted">Protected area — sign in to post bulletins.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
