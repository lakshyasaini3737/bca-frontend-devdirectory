import { Link } from 'react-router-dom';

const GRADIENTS = [
  'linear-gradient(135deg,#8b5cf6,#6366f1)',
  'linear-gradient(135deg,#06b6d4,#3b82f6)',
  'linear-gradient(135deg,#f43f5e,#f59e0b)',
  'linear-gradient(135deg,#10b981,#06b6d4)',
  'linear-gradient(135deg,#ec4899,#8b5cf6)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
];

export const avatarGradient = (id) => GRADIENTS[(id - 1) % GRADIENTS.length];

export const initials = (name = '') =>
  name
    .split(' ')
    .filter((w) => !/^(mr|mrs|ms|dr)\.?$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

export default function UserCard({ user }) {
  return (
    <Link to={`/users/${user.id}`} className="card user-card">
      <div className="avatar" style={{ background: avatarGradient(user.id) }}>
        {initials(user.name)}
      </div>
      <h3 className="user-name">{user.name}</h3>
      <p className="muted mono">@{user.username}</p>

      <ul className="user-meta">
        <li>🏢 {user.company?.name}</li>
        <li>📍 {user.address?.city}</li>
        <li className="truncate">✉️ {user.email}</li>
      </ul>

      <span className="card-link">View profile →</span>
    </Link>
  );
}
