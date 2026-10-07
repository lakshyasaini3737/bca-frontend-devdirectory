import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge">✦ Built for Developers</div>

          <h1>
            Discover the
            <span className="hero-gradient"> Developer </span>
            Community
          </h1>

          <p className="hero-description">
            DevSphere is a modern developer community where you can
            discover developers, explore profiles, and connect with
            people building amazing things with technology.
          </p>

          <div className="hero-actions">
            <Link to="/users" className="primary-btn">
              Explore Developers
              <span>→</span>
            </Link>

            <Link to="/login" className="secondary-btn">
              Get Started
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-window">
            <div className="window-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="code-content">
              <div>
                <span className="code-purple">const</span>{" "}
                <span className="code-blue">developer</span> = {"{"}
              </div>

              <div className="code-indent">
                name:{" "}
                <span className="code-green">
                  "Creative Developer"
                </span>
                ,
              </div>

              <div className="code-indent">
                skills: [
                <span className="code-green">"React"</span>,{" "}
                <span className="code-green">"JavaScript"</span>],
              </div>

              <div className="code-indent">
                passion:{" "}
                <span className="code-green">
                  "Building"
                </span>
              </div>

              <div>{"}"};</div>

              <br />

              <div>
                <span className="code-purple">console</span>.
                <span className="code-blue">log</span>(
                <span className="code-green">
                  "Welcome to DevSphere!"
                </span>
                );
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">👨‍💻</div>
          <h3>Developers</h3>
          <p>
            Discover developers from around the world.
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <h3>Build & Share</h3>
          <p>
            Share ideas, projects and technical knowledge.
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌐</div>
          <h3>Connect</h3>
          <p>
            Explore profiles and connect with the community.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span className="section-label">WHY DEVSPHERE</span>

          <h2>
            Everything developers need
            <span className="hero-gradient"> in one place.</span>
          </h2>

          <p>
            A clean and simple platform designed to make
            discovering developers and their work easier.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>

            <h3>Developer Directory</h3>

            <p>
              Browse developer profiles and discover people with
              different skills, interests and backgrounds.
            </p>

            <Link to="/users">
              Explore directory →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-number">02</div>

            <h3>Developer Profiles</h3>

            <p>
              View detailed profiles and learn more about
              developers and their technical interests.
            </p>

            <Link to="/users">
              View profiles →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-number">03</div>

            <h3>Community Posts</h3>

            <p>
              Share your thoughts, ideas and technical knowledge
              with the developer community.
            </p>

            <Link to="/add-post">
              Create a post →
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span className="section-label">
            JOIN THE COMMUNITY
          </span>

          <h2>
            Start exploring
            <span className="hero-gradient"> DevSphere.</span>
          </h2>

          <p>
            Discover developers, explore profiles and become
            part of a growing technology community.
          </p>
        </div>

        <Link to="/users" className="primary-btn">
          Explore Now
          <span>→</span>
        </Link>
      </section>
    </div>
  );
};

export default Home;