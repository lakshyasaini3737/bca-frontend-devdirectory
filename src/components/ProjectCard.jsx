import { Link } from 'react-router-dom';
import { money, payout, useProjects } from '../context/ProjectsContext.jsx';

const LABEL = { open: 'Open', 'in-progress': 'In progress', completed: 'Completed' };

export default function ProjectCard({ project }) {
  const { team } = useProjects();
  const left = project.slots - team(project.id).length;
  return (
    <Link to={`/projects/${project.id}`} className="card project-card">
      <div className="row between">
        <span className="chip chip-accent">{project.category}</span>
        <span className={`badge badge-${project.status}`}>{LABEL[project.status]}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="muted clamp">{project.description}</p>
      <div className="chips">
        {project.skills.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>
      <div className="pay-row">
        <div><strong className="pay">{money(payout(project))}</strong><span className="muted small"> per member</span></div>
        <div className="muted small">${project.rate}/hr · {project.weeks} wk</div>
      </div>
      <p className="muted small">{left > 0 ? `${left} of ${project.slots} spots left` : 'Team full'} · by {project.ownerName}</p>
    </Link>
  );
}