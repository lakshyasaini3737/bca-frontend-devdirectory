import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useProjects, money } from '../context/ProjectsContext.jsx';
import { CATS } from './Projects.jsx';

export default function NewProject() {
  const { user } = useAuth();
  const { addProject } = useProjects();
  const navigate = useNavigate();
  const [f, setF] = useState({ title: '', category: 'Frontend', level: 'Intermediate', budget: '', rate: '', slots: 1, weeks: 2, skills: '', description: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (f.title.trim().length < 6) e.title = 'Title needs at least 6 characters.';
    if (!(Number(f.budget) >= 50)) e.budget = 'Total budget must be at least $50.';
    if (!(Number(f.rate) >= 5)) e.rate = 'Hourly rate must be at least $5.';
    if (!(Number(f.slots) >= 1 && Number(f.slots) <= 10)) e.slots = 'Team size must be between 1 and 10.';
    if (!f.skills.trim()) e.skills = 'Add at least one skill, separated by commas.';
    if (f.description.trim().length < 30) e.description = 'Describe the work in at least 30 characters.';
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const id = addProject({
      ...f,
      title: f.title.trim(),
      description: f.description.trim(),
      budget: Number(f.budget), rate: Number(f.rate), slots: Number(f.slots), weeks: Number(f.weeks),
      skills: f.skills.split(',').map((s) => s.trim()).filter(Boolean),
    }, user);
    navigate(`/projects/${id}`);
  };

  const per = f.budget && f.slots ? money(Math.round(f.budget / f.slots)) : '—';

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h1>Post a project</h1>
      <label>Title<input className="input" value={f.title} onChange={set('title')} maxLength={80} />{err.title && <small className="error">{err.title}</small>}</label>
      <div className="two">
        <label>Category<select className="input" value={f.category} onChange={set('category')}>{CATS.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Level<select className="input" value={f.level} onChange={set('level')}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
      </div>
      <div className="two">
        <label>Total budget (USD)<input className="input" type="number" min="0" value={f.budget} onChange={set('budget')} />{err.budget && <small className="error">{err.budget}</small>}</label>
        <label>Hourly rate (USD)<input className="input" type="number" min="0" value={f.rate} onChange={set('rate')} />{err.rate && <small className="error">{err.rate}</small>}</label>
      </div>
      <div className="two">
        <label>Team size<input className="input" type="number" min="1" max="10" value={f.slots} onChange={set('slots')} />{err.slots && <small className="error">{err.slots}</small>}</label>
        <label>Duration (weeks)<input className="input" type="number" min="1" value={f.weeks} onChange={set('weeks')} /></label>
      </div>
      <p className="muted small">Each team member earns about {per}.</p>
      <label>Skills (comma separated)<input className="input" value={f.skills} onChange={set('skills')} placeholder="React, Node.js" />{err.skills && <small className="error">{err.skills}</small>}</label>
      <label>Description<textarea className="input" rows={5} maxLength={600} value={f.description} onChange={set('description')} />
        <small className="muted">{f.description.length}/600</small>{err.description && <small className="error"> {err.description}</small>}</label>
      <button className="btn btn-primary" type="submit">Publish project</button>
    </form>
  );
}