import { Link, useParams } from 'react-router-dom';
import AlertBanner from '../components/AlertBanner';
import SkeletonLoader from '../components/SkeletonLoader';
import { avatarGradient, initials } from '../components/UserCard';
import useFetch from '../hooks/useFetch';
import { getPostsByUser, getUserById } from '../services/postService';

const capitalize = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);

export default function UserProfile() {
  const { id } = useParams();

  const user = useFetch(() => getUserById(id), [id]);
  const posts = useFetch(() => getPostsByUser(id), [id]);

  return (
    <>
      <Link to="/users" className="back-link">← Back to directory</Link>

      {user.error && (
        <>
          <AlertBanner message={user.error} onRetry={user.reload} />
          <div className="card empty-state">
            <span>🙈</span>
            <h3>Developer unavailable</h3>
            <p className="muted">We couldn't load the profile for user #{id}.</p>
            <Link to="/users" className="btn btn-primary">See all developers</Link>
          </div>
        </>
      )}

      {user.loading && (
        <div className="card skeleton-box profile-skel">
          <div className="skeleton sk-avatar" />
          <div className="skeleton sk-line w60" />
          <div className="skeleton sk-line w40" />
        </div>
      )}

      {user.data && (
        <section className="card profile-head">
          <div className="avatar avatar-lg" style={{ background: avatarGradient(user.data.id) }}>
            {initials(user.data.name)}
          </div>
          <div className="profile-info">
            <h1>{user.data.name}</h1>
            <p className="muted mono">@{user.data.username}</p>
            <p className="company-line">
              {user.data.company?.name} — <i>“{user.data.company?.catchPhrase}”</i>
            </p>
            <div className="chip-row">
              <span className="chip">✉️ {user.data.email}</span>
              <span className="chip">📞 {user.data.phone}</span>
              <span className="chip">🌐 {user.data.website}</span>
              <span className="chip">📍 {user.data.address?.city}</span>
            </div>
          </div>
        </section>
      )}

      {!user.error && (
        <section>
          <div className="page-head">
            <h2 className="section-title">Publications</h2>
            {posts.data && <span className="chip">{posts.data.length} posts</span>}
          </div>

          {posts.error && <AlertBanner message={posts.error} onRetry={posts.reload} />}
          {posts.loading && <SkeletonLoader variant="post" count={3} />}

          {posts.data && posts.data.length === 0 && (
            <div className="card empty-state">
              <span>📭</span>
              <h3>No posts yet</h3>
            </div>
          )}

          {posts.data && posts.data.length > 0 && (
            <div className="stack">
              {posts.data.map((p, i) => (
                <article className="card post-card" key={p.id}>
                  <span className="post-num mono">#{String(i + 1).padStart(2, '0')}</span>
                  <h3>{capitalize(p.title)}</h3>
                  <p className="muted">{capitalize(p.body)}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
