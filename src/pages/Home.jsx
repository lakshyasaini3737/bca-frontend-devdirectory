
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge">
            <span className="badge-sparkle">✦</span>
            Built for Developers
          </div>

          <h1>
            Where Developers
            <span className="hero-gradient"> Connect & Create.</span>
          </h1>

          <p className="hero-description">
            Discover developer profiles, explore technical interests,
            and find inspiration in a community built for people who
            love creating with technology.
          </p>

          <div className="hero-actions">
            <Link to="/users" className="primary-btn">
              Explore Developers <span>↗</span>
            </Link>

            <Link to="/add-post" className="secondary-btn">
              Create a Post <span>＋</span>
            </Link>
          </div>

          <div className="hero-trust">
            <span className="trust-dot" />
            <span>Explore profiles. Share ideas. Keep building.</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="code-window">
            <div className="window-header">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="window-title">developer.js</span>
              <span className="window-status">● Live</span>
            </div>

            <div className="code-content">
              <div className="code-line">
                <span className="code-line-number">01</span>
                <span>
                  <span className="code-purple">const</span>{" "}
                  <span className="code-blue">developer</span> = {"{"}
                </span>
              </div>

              <div className="code-line">
                <span className="code-line-number">02</span>
                <span className="code-indent">
                  name: <span className="code-green">"Creator"</span>,
                </span>
              </div>

              <div className="code-line">
                <span className="code-line-number">03</span>
                <span className="code-indent">
                  skills: [
                  <span className="code-green">"React"</span>,{" "}
                  <span className="code-green">"JS"</span>],
                </span>
              </div>

              <div className="code-line">
                <span className="code-line-number">04</span>
                <span className="code-indent">
                  mindset: <span className="code-green">"Keep Learning"</span>,
                </span>
              </div>

              <div className="code-line">
                <span className="code-line-number">05</span>
                <span>{"};"}</span>
              </div>

              <div className="code-gap" />

              <div className="code-line">
                <span className="code-line-number">06</span>
                <span>
                  <span className="code-purple">console</span>.
                  <span className="code-blue">log</span>(
                </span>
              </div>

              <div className="code-line">
                <span className="code-line-number">07</span>
                <span className="code-indent code-green">
                  "Welcome to DevSphere!"
                </span>
              </div>

              <div className="code-line">
                <span className="code-line-number">08</span>
                <span>);</span>
              </div>
            </div>

            <div className="code-window-footer">
              <span>✦ Build something amazing</span>
              <span>JavaScript</span>
            </div>
          </div>

          <div className="floating-chip chip-top">
            <span className="chip-icon">✦</span>
            <span>
              <strong>Learn</strong>
              <small>Grow your skills</small>
            </span>
          </div>

          <div className="floating-chip chip-bottom">
            <span className="chip-icon">{"</>"}</span>
            <span>
              <strong>Create & Share</strong>
              <small>Ideas into projects</small>
            </span>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <article className="stat-card">
          <div className="stat-icon">{"</>"}</div>
          <h3>Discover</h3>
          <p>Explore developer profiles and technical interests.</p>
        </article>

        <article className="stat-card">
          <div className="stat-icon">✧</div>
          <h3>Create</h3>
          <p>Share ideas, learning and projects with others.</p>
        </article>

        <article className="stat-card">
          <div className="stat-icon">◎</div>
          <h3>Connect</h3>
          <p>Find inspiration from a community of builders.</p>
        </article>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span className="section-label">THE DEVSPHERE EXPERIENCE</span>

          <h2>
            Your developer journey,
            <span className="hero-gradient"> all in one place.</span>
          </h2>

          <p>
            Discover people, explore profiles and share what you are
            learning in a modern developer-focused space.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-topline">
              <span className="feature-number">01</span>
              <span className="feature-symbol">⌕</span>
            </div>

            <h3>Developer Directory</h3>

            <p>
              Browse profiles and discover developers with different
              interests and technical backgrounds.
            </p>

            <Link to="/users">Explore directory <span>↗</span></Link>
          </article>

          <article className="feature-card">
            <div className="feature-topline">
              <span className="feature-number">02</span>
              <span className="feature-symbol">◈</span>
            </div>

            <h3>Developer Profiles</h3>

            <p>
              Explore profile details, contact fields provided by the API,
              and available developer information.
            </p>

            <Link to="/users">View profiles <span>↗</span></Link>
          </article>

          <article className="feature-card">
            <div className="feature-topline">
              <span className="feature-number">03</span>
              <span className="feature-symbol">✎</span>
            </div>

            <h3>Community Posts</h3>

            <p>
              Visit the post creation page and explore the community
              sharing experience.
            </p>

            <Link to="/add-post">Create a post <span>↗</span></Link>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-decoration">✦</div>

        <div className="cta-copy">
          <span className="section-label">YOUR NEXT STEP STARTS HERE</span>

          <h2>
            Keep building.
            <span className="hero-gradient"> Keep connecting.</span>
          </h2>

          <p>
            Explore DevSphere and discover new ideas for your developer
            journey.
          </p>
        </div>

        <Link to="/users" className="primary-btn">
          Explore DevSphere <span>↗</span>
        </Link>
      </section>
    </main>
  );
};

export default Home;