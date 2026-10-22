import { Link } from 'react-router-dom';
import Avatar from './Avatar.jsx';

export default function UserCard({ dev }) {
  return (
    <Link to={`/users/${dev.id}`} className="card user-card">
      <div className="row">
        <Avatar name={dev.name} />
        <div>
          <h3>{dev.name}</h3>
          <p className="muted">{dev.role}</p>
        </div>
      </div>
      <p className="muted small">{dev.company} · {dev.city}</p>
      <div className="chips">
        {dev.skills.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>
      <div className="card-foot">
        <strong>${dev.rate}/hr</strong>
        <span className={dev.available ? 'badge badge-open' : 'badge badge-busy'}>
          {dev.available ? 'Available' : 'Busy'}
        </span>
      </div>
    </Link>
  );
}