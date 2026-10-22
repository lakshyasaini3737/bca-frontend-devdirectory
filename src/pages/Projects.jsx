
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import useDebounce from '../hooks/useDebounce.js';
import ProjectCard from '../components/ProjectCard.jsx';

const CATS = [
  'Frontend',
  'Backend',
  'Full Stack',
  'Mobile',
  'DevOps',
  'AI',
  'QA',
  'Design',
];

export default function Projects() {
  const { projects } = useProjects();
  const { user } = useAuth();

  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [status, setStatus] = useState('open');
  const [sort, setSort] = useState('new');

  const term = useDebounce(q, 300).trim().toLowerCase();

  const list = useMemo(() => {
    return projects
      .filter((project) => status === 'all' || project.status === status)
      .filter((project) => cat === 'all' || project.category === cat)
      .filter((project) => {
        if (!term) return true;

        const searchable = [
          project.title,
          project.description,
          ...(Array.isArray(project.skills) ? project.skills : []),
        ];

        return searchable.some((value) =>
          String(value || '').toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        if (sort === 'pay') {
          const payA = Number(a.budget || 0) / Math.max(Number(a.slots) || 1, 1);
          const payB = Number(b.budget || 0) / Math.max(Number(b.slots) || 1, 1);
          return payB - payA;
        }

        if (sort === 'rate') {
          return Number(b.rate || 0) - Number(a.rate || 0);
        }

        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [projects, term, cat, status, sort]);

  const clearFilters = () => {
    setQ('');
    setCat('all');
    setStatus('open');
    setSort('new');
  };

  const activeFilters =
    q.trim() !== '' || cat !== 'all' || status !== 'open' || sort !== 'new';

  return (
    <main className="projects-page">
      <section className="projects-hero">
        <div className="projects-hero-copy">
          <span className="projects-eyebrow">
            <span aria-hidden="true">✦</span> THE OPPORTUNITY BOARD
          </span>

          <h1>
            Find work worth <span className="projects-gradient">building.</span>
          </h1>

          <p>
            Explore real project opportunities, put your skills to work,
            and collaborate with developers building something meaningful.
          </p>

          <div className="projects-hero-points">
            <span><span aria-hidden="true">✓</span> Explore opportunities</span>
            <span><span aria-hidden="true">✓</span> Find your next challenge</span>
          </div>
        </div>

        <div className="projects-hero-side">
          <div className="projects-hero-symbol" aria-hidden="true">{'{ }'}</div>
          <span className="projects-hero-side-label">BUILD TOGETHER</span>
          <strong>Ideas into impact.</strong>
          <span className="projects-hero-side-copy">
            Your next collaboration starts here.
          </span>
        </div>
      </section>

      <section className="projects-heading-row">
        <div>
          <span className="projects-eyebrow">EXPLORE THE BOARD</span>
          <h2>Discover projects</h2>
          <p>Find an opportunity that matches your skills and interests.</p>
        </div>

        <Link
          to={user ? '/projects/new' : '/login'}
          state={{ from: { pathname: '/projects/new' } }}
          className="btn btn-primary projects-post-button"
        >
          <span aria-hidden="true">＋</span> Post a project
        </Link>
      </section>

      <section className="projects-filter-panel" aria-label="Project search and filters">
        <div className="projects-search-field">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search projects, descriptions or skills..."
            value={q}
            onChange={(event) => setQ(event.target.value)}
            aria-label="Search projects or skills"
          />

          {q && (
            <button
              type="button"
              className="projects-clear-search"
              onClick={() => setQ('')}
              aria-label="Clear search text"
            >
              ×
            </button>
          )}
        </div>

        <div className="projects-filter-controls">
          <label className="projects-filter-field">
            <span>Category</span>
            <select value={cat} onChange={(event) => setCat(event.target.value)}>
              <option value="all">All categories</option>
              {CATS.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className="projects-filter-field">
            <span>Project status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="open">Open</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="all">All statuses</option>
            </select>
          </label>

          <label className="projects-filter-field">
            <span>Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="new">Newest first</option>
              <option value="pay">Highest payout</option>
              <option value="rate">Highest hourly rate</option>
            </select>
          </label>
        </div>
      </section>

      <section className="projects-results-section">
        <div className="projects-results-heading">
          <div>
            <h2>{status === 'open' ? 'Open opportunities' : 'Project listings'}</h2>
            <p className="projects-results-subtitle">
              {list.length === 1
                ? '1 project matches your selection'
                : `${list.length} projects match your selection`}
            </p>
          </div>

          {activeFilters && (
            <button
              type="button"
              className="projects-reset-button"
              onClick={clearFilters}
            >
              Reset filters <span aria-hidden="true">↻</span>
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="projects-empty-state">
            <div className="projects-empty-icon" aria-hidden="true">⌕</div>
            <span className="projects-eyebrow">NO MATCHES FOUND</span>
            <h2>No projects found<span className="projects-gradient">.</span></h2>
            <p>
              Try a different search or adjust your filters to explore more opportunities.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={clearFilters}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid projects-card-grid">
            {list.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="projects-bottom-cta">
        <div>
          <span className="projects-eyebrow">GOT AN IDEA?</span>
          <h2>Bring your next project to life.</h2>
          <p>Share your project and find people who can help you build it.</p>
        </div>

        <Link
          to={user ? '/projects/new' : '/login'}
          state={{ from: { pathname: '/projects/new' } }}
          className="btn btn-primary"
        >
          Create a project <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

export { CATS };
