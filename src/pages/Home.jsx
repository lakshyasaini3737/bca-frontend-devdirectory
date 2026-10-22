
import { Link } from 'react-router-dom';
import { DEVELOPERS } from '../data/developers.js';
import { money, useProjects } from '../context/ProjectsContext.jsx';
import UserCard from '../components/UserCard.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Home() {
  const { projects } = useProjects();

  const openProjects = projects.filter((project) => project.status === 'open');
  const availableDevelopers = DEVELOPERS.filter((developer) => developer.available);
  const totalBudget = projects.reduce(
    (sum, project) => sum + Number(project.budget || 0),
    0
  );

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-glow home-hero-glow-one" aria-hidden="true" />
        <div className="home-hero-glow home-hero-glow-two" aria-hidden="true" />

        <div className="home-hero-content">
          <span className="home-eyebrow">
            <span className="home-eyebrow-dot" />
            YOUR NEXT COLLABORATION STARTS HERE
          </span>

          <h1>
            Great developers.
            <br />
            <span className="home-gradient-text">Ambitious projects.</span>
            <br />
            Real possibilities.
          </h1>

          <p className="home-hero-description">
            Discover talented developers, find exciting projects, and turn
            your ideas into something meaningful — together.
          </p>

          <div className="home-hero-actions">
            <Link to="/projects" className="btn btn-primary home-primary-cta">
              Explore projects <span aria-hidden="true">↗</span>
            </Link>

            <Link to="/users" className="btn home-secondary-cta">
              Meet developers <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="home-trust-line">
            <span className="home-trust-mark" aria-hidden="true">✓</span>
            <span>Discover talent. Build together. Grow your portfolio.</span>
          </div>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <div className="home-visual-orbit home-orbit-one" />
          <div className="home-visual-orbit home-orbit-two" />

          <div className="home-code-window">
            <div className="home-window-bar">
              <div className="home-window-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="home-window-label">devsphere.jsx</span>
            </div>

            <div className="home-code-content">
              <div><span className="home-code-muted">01</span> <span className="home-code-purple">const</span> <span className="home-code-blue">ideas</span> = <span className="home-code-green">"big"</span>;</div>
              <div><span className="home-code-muted">02</span> </div>
              <div><span className="home-code-muted">03</span> <span className="home-code-purple">const</span> <span className="home-code-blue">team</span> = <span className="home-code-green">"great"</span>;</div>
              <div><span className="home-code-muted">04</span> </div>
              <div><span className="home-code-muted">05</span> <span className="home-code-purple">function</span> <span className="home-code-yellow">buildSomething</span>() {'{'}</div>
              <div><span className="home-code-muted">06</span> &nbsp; <span className="home-code-purple">return</span> <span className="home-code-blue">ideas</span> + <span className="home-code-blue">team</span>;</div>
              <div><span className="home-code-muted">07</span> {'}'}</div>
              <div><span className="home-code-muted">08</span> </div>
              <div><span className="home-code-muted">09</span> <span className="home-code-green">{"// Let's build together."}</span></div>
            </div>

            <div className="home-code-status">
              <span><span className="home-status-dot" /> Ready to build</span>
              <span>DevSphere</span>
            </div>
          </div>

          <div className="home-float-card home-float-top">
            <span className="home-float-icon home-float-icon-blue">⌘</span>
            <span>
              <strong>Find your team</strong>
              <small>Skills that fit your vision</small>
            </span>
          </div>

          <div className="home-float-card home-float-bottom">
            <span className="home-float-icon home-float-icon-green">↗</span>
            <span>
              <strong>Make it happen</strong>
              <small>Turn plans into projects</small>
            </span>
          </div>
        </div>
      </section>

      {/* Live project and developer statistics */}
      <section className="home-stats" aria-label="DevSphere statistics">
        <div className="home-stat-card">
          <span className="home-stat-icon">◉</span>
          <div>
            <strong>{DEVELOPERS.length}</strong>
            <span>Developers</span>
          </div>
          <span className="home-stat-note">Talent network</span>
        </div>

        <div className="home-stat-card">
          <span className="home-stat-icon home-stat-icon-green">↗</span>
          <div>
            <strong>{openProjects.length}</strong>
            <span>Open projects</span>
          </div>
          <span className="home-stat-note">Ready to explore</span>
        </div>

        <div className="home-stat-card">
          <span className="home-stat-icon home-stat-icon-purple">◇</span>
          <div>
            <strong>{money(totalBudget)}</strong>
            <span>Total project budgets</span>
          </div>
          <span className="home-stat-note">Across all projects</span>
        </div>
      </section>

      {/* Open projects */}
      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <span className="home-section-kicker">OPPORTUNITIES</span>
            <h2>Projects worth building</h2>
            <p>Find your next challenge and put your skills to work.</p>
          </div>

          <Link to="/projects" className="home-view-all">
            View all projects <span aria-hidden="true">→</span>
          </Link>
        </div>

        {openProjects.length > 0 ? (
          <div className="grid home-project-grid">
            {openProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="home-empty-state">
            <span className="home-empty-icon">◇</span>
            <h3>No open projects right now</h3>
            <p>Explore the developer community while new opportunities are added.</p>
            <Link to="/users" className="btn btn-primary">
              Explore developers
            </Link>
          </div>
        )}
      </section>

      {/* Featured developers */}
      <section className="home-section home-developers-section">
        <div className="home-section-heading">
          <div>
            <span className="home-section-kicker">THE COMMUNITY</span>
            <h2>Meet your future teammates</h2>
            <p>Connect with available developers and create something great.</p>
          </div>

          <Link to="/users" className="home-view-all">
            Meet everyone <span aria-hidden="true">→</span>
          </Link>
        </div>

        {availableDevelopers.length > 0 ? (
          <div className="grid home-developer-grid">
            {availableDevelopers.slice(0, 6).map((developer) => (
              <UserCard key={developer.id} dev={developer} />
            ))}
          </div>
        ) : (
          <div className="home-empty-state">
            <span className="home-empty-icon">◎</span>
            <h3>More connections are on the way</h3>
            <p>Visit the directory to explore the developer community.</p>
            <Link to="/users" className="btn">
              Browse directory
            </Link>
          </div>
        )}
      </section>

      {/* Final call to action */}
      <section className="home-bottom-cta">
        <div className="home-cta-decoration" aria-hidden="true">✳</div>
        <div>
          <span className="home-section-kicker">YOUR NEXT CHAPTER</span>
          <h2>Have an idea? Find your people.</h2>
          <p>Explore projects, connect with developers, and take the next step.</p>
        </div>
        <Link to="/projects" className="btn btn-primary home-primary-cta">
          Start exploring <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
