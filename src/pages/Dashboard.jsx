
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  money,
  payout,
  useProjects,
} from '../context/ProjectsContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();

  const {
    projects,
    applications,
    isOwner,
    applicationsFor,
    resetDemo,
  } = useProjects();

  const owned = projects.filter((project) =>
    isOwner(project, user)
  );

  const mine = applications
    .filter((application) => application.email === user.email)
    .map((application) => ({
      ...application,
      project: projects.find(
        (project) => project.id === application.projectId
      ),
    }))
    .filter((application) => application.project);

  const earned = mine
    .filter(
      (application) =>
        application.status === 'approved' &&
        application.project.status === 'completed'
    )
    .reduce(
      (sum, application) => sum + payout(application.project),
      0
    );

  const expected = mine
    .filter(
      (application) =>
        application.status === 'approved' &&
        application.project.status !== 'completed'
    )
    .reduce(
      (sum, application) => sum + payout(application.project),
      0
    );

  const pending = owned.reduce(
    (sum, project) =>
      sum +
      applicationsFor(project.id).filter(
        (application) => application.status === 'pending'
      ).length,
    0
  );

  const pendingMine = mine.filter(
    (application) => application.status === 'pending'
  ).length;

  const approvedMine = mine.filter(
    (application) => application.status === 'approved'
  ).length;

  const reset = () => {
    const confirmed = window.confirm(
      'Reset all demo projects and applications?'
    );

    if (confirmed) resetDemo();
  };

  return (
    <main className="dash-page">
      <section className="dash-welcome">
        <div className="dash-welcome-copy">
          <span className="dash-eyebrow">
            YOUR DEVSPHERE WORKSPACE
          </span>

          <h1>
            My <span>dashboard.</span>
          </h1>

          <p>
            Keep track of your projects, applications and earnings
            all in one place.
          </p>

          <div className="dash-welcome-actions">
            <Link
              to="/projects"
              className="btn btn-primary"
            >
              Explore projects <span aria-hidden="true">↗</span>
            </Link>

            <Link to="/projects/new" className="btn">
              + Post a project
            </Link>
          </div>
        </div>

        <div className="dash-welcome-visual" aria-hidden="true">
          <div className="dash-visual-orbit dash-orbit-one" />
          <div className="dash-visual-orbit dash-orbit-two" />

          <div className="dash-visual-core">
            <span className="dash-core-symbol">DS</span>
            <span>YOUR WORKSPACE</span>
          </div>

          <div className="dash-float-card dash-float-top">
            <span className="dash-float-icon">↗</span>
            <div>
              <strong>{owned.length}</strong>
              <span>Projects posted</span>
            </div>
          </div>

          <div className="dash-float-card dash-float-bottom">
            <span className="dash-float-icon">✓</span>
            <div>
              <strong>{approvedMine}</strong>
              <span>Approved applications</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dash-stats" aria-label="Work summary">
        <article className="dash-stat-card dash-stat-earned">
          <div className="dash-stat-top">
            <span className="dash-stat-icon">₹</span>
            <span className="dash-stat-label">COMPLETED WORK</span>
          </div>
          <strong className="dash-stat-value">
            {money(earned)}
          </strong>
          <p>Earned from completed projects</p>
        </article>

        <article className="dash-stat-card">
          <div className="dash-stat-top">
            <span className="dash-stat-icon">◷</span>
            <span className="dash-stat-label">ACTIVE WORK</span>
          </div>
          <strong className="dash-stat-value">
            {money(expected)}
          </strong>
          <p>Expected from approved applications</p>
        </article>

        <article className="dash-stat-card">
          <div className="dash-stat-top">
            <span className="dash-stat-icon">✉</span>
            <span className="dash-stat-label">OWNER ACTIONS</span>
          </div>
          <strong className="dash-stat-value">
            {pending}
          </strong>
          <p>Applications waiting for your review</p>
        </article>

        <article className="dash-stat-card">
          <div className="dash-stat-top">
            <span className="dash-stat-icon">▤</span>
            <span className="dash-stat-label">MY APPLICATIONS</span>
          </div>
          <strong className="dash-stat-value">
            {mine.length}
          </strong>
          <p>
            {pendingMine} pending · {approvedMine} approved
          </p>
        </article>
      </section>

      <section className="dash-section">
        <div className="dash-section-heading">
          <div>
            <span className="dash-eyebrow">WHAT YOU'RE BUILDING</span>
            <h2>Projects I posted</h2>
            <p>Manage your projects and review their progress.</p>
          </div>

          <div className="dash-heading-side">
            <span className="dash-section-count">
              {owned.length} {owned.length === 1 ? 'project' : 'projects'}
            </span>

            <Link
              to="/projects/new"
              className="dash-text-link"
            >
              + Create new
            </Link>
          </div>
        </div>

        {owned.length === 0 ? (
          <div className="dash-empty">
            <span className="dash-empty-icon">↗</span>
            <h3>Your next project starts here</h3>
            <p>
              You haven't posted a project yet. Create an opportunity
              and find developers to work with.
            </p>
            <Link
              to="/projects/new"
              className="btn btn-primary"
            >
              Post your first project
            </Link>
          </div>
        ) : (
          <div className="dash-list">
            {owned.map((project) => {
              const projectPending = applicationsFor(project.id).filter(
                (application) => application.status === 'pending'
              ).length;

              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="dash-project-row"
                >
                  <div className="dash-row-symbol">⌘</div>

                  <div className="dash-row-main">
                    <strong>{project.title}</strong>
                    <div className="dash-row-meta">
                      <span>{project.category}</span>
                      <span className="dash-meta-dot">·</span>
                      <span>{money(project.budget)} budget</span>
                      <span className="dash-meta-dot">·</span>
                      <span>{project.slots} team spots</span>
                    </div>
                  </div>

                  <div className="dash-row-end">
                    {projectPending > 0 && (
                      <span className="dash-pending-label">
                        {projectPending} pending
                      </span>
                    )}

                    <span
                      className={`dash-status dash-status-${project.status}`}
                    >
                      {project.status.replace('-', ' ')}
                    </span>

                    <span className="dash-row-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="dash-section">
        <div className="dash-section-heading">
          <div>
            <span className="dash-eyebrow">YOUR OPPORTUNITIES</span>
            <h2>My applications</h2>
            <p>Follow the status of projects you've applied to.</p>
          </div>

          <div className="dash-heading-side">
            <span className="dash-section-count">
              {mine.length} {mine.length === 1 ? 'application' : 'applications'}
            </span>

            <Link to="/projects" className="dash-text-link">
              Find work <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {mine.length === 0 ? (
          <div className="dash-empty">
            <span className="dash-empty-icon">⌕</span>
            <h3>Discover your next opportunity</h3>
            <p>
              You haven't applied to any projects yet. Explore available
              work and find a project that matches your skills.
            </p>
            <Link to="/projects" className="btn btn-primary">
              Browse projects
            </Link>
          </div>
        ) : (
          <div className="dash-list">
            {mine.map((application) => (
              <Link
                key={application.id}
                to={`/projects/${application.projectId}`}
                className="dash-project-row"
              >
                <div className="dash-row-symbol">⌘</div>

                <div className="dash-row-main">
                  <strong>{application.project.title}</strong>
                  <div className="dash-row-meta">
                    <span>{application.project.category}</span>
                    <span className="dash-meta-dot">·</span>
                    <span>
                      Potential payout: {money(payout(application.project))}
                    </span>
                  </div>
                </div>

                <div className="dash-row-end">
                  <span
                    className={`dash-status dash-status-${application.status}`}
                  >
                    {application.status}
                  </span>

                  <span className="dash-row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="dash-bottom-cta">
        <div>
          <span className="dash-eyebrow">KEEP BUILDING</span>
          <h2>Great work starts with the right team.</h2>
          <p>
            Discover new projects, meet developers and make your next
            idea happen.
          </p>
        </div>

        <Link to="/projects" className="btn btn-primary">
          Explore opportunities <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <div className="dash-settings">
        <div>
          <strong>Demo workspace</strong>
          <p>
            Reset demo projects and applications to their initial state.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={reset}
        >
          Reset demo data
        </button>
      </div>
    </main>
  );
}
