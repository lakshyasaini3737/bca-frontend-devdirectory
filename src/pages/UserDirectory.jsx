
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDevelopers } from '../services/developerService.js';

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadDevelopers() {
      try {
        setLoading(true);
        setError('');

        const developers = await getDevelopers();

        if (!cancelled) {
          setUsers(Array.isArray(developers) ? developers : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Unable to load developer profiles.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDevelopers();

    return () => {
      cancelled = true;
    };
  }, [retry]);

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return users;

    return users.filter((user) =>
      [
        user.name,
        user.username,
        user.email,
        user.role,
        user.company,
        user.city,
        user.phone,
        user.address,
        ...(Array.isArray(user.skills) ? user.skills : []),
      ].some((value) =>
        String(value || '').toLowerCase().includes(keyword)
      )
    );
  }, [users, search]);

  if (loading) {
    return (
      <main className="directory-page directory-state">
        <div className="directory-loader" role="status" aria-label="Loading developers" />
        <span className="directory-eyebrow">DEVSPHERE COMMUNITY</span>
        <h1>Finding your community<span className="directory-heading-dot">.</span></h1>
        <p>Loading developer profiles. Just a moment...</p>

        <div className="directory-loading-grid" aria-hidden="true">
          {[1, 2, 3].map((item) => (
            <div className="directory-skeleton" key={item}>
              <div className="directory-skeleton-top" />
              <div className="directory-skeleton-line" />
              <div className="directory-skeleton-line short" />
              <div className="directory-skeleton-block" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="directory-page">
        <section className="directory-state error-state" role="alert">
          <div className="directory-state-icon" aria-hidden="true">!</div>
          <span className="directory-eyebrow">CONNECTION ISSUE</span>
          <h1>Profiles aren’t available<span className="directory-heading-dot">.</span></h1>
          <p>{error}</p>

          <button
            type="button"
            className="directory-action"
            onClick={() => setRetry((current) => current + 1)}
          >
            Try again <span aria-hidden="true">↻</span>
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="directory-page directory-page-enhanced">
      <section className="directory-header">
        <div className="directory-heading-copy">
          <span className="directory-eyebrow">
            <span className="directory-eyebrow-sparkle" aria-hidden="true">✦</span>
            DEVSPHERE COMMUNITY
          </span>

          <h1>
            Meet the <span className="hero-gradient">Developers.</span>
          </h1>

          <p>
            Great projects start with great people. Discover developers,
            explore their skills, and find your next collaborator.
          </p>

          <div className="directory-header-points">
            <span><span aria-hidden="true">✓</span> Explore skills</span>
            <span><span aria-hidden="true">✓</span> Discover talent</span>
            <span><span aria-hidden="true">✓</span> Build together</span>
          </div>
        </div>

        <div className="developer-count">
          <span className="developer-count-icon" aria-hidden="true">⌘</span>
          <strong>{users.length}</strong>
          <span>Developer {users.length === 1 ? 'Profile' : 'Profiles'}</span>
          <span className="developer-count-caption">In the DevSphere community</span>
        </div>
      </section>

      <section className="directory-toolbar" aria-label="Search developer directory">
        <label className="search-wrapper">
          <span className="search-icon" aria-hidden="true">⌕</span>

          <input
            type="search"
            placeholder="Search by name, role, skills, email or city..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search developers by name, role, skills, email or city"
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <span className="result-count" aria-live="polite">
          <span className="result-count-number">{filteredUsers.length}</span>
          {' '}{filteredUsers.length === 1 ? 'developer' : 'developers'} found
        </span>
      </section>

      {filteredUsers.length > 0 ? (
        <section className="developer-grid" aria-label="Developer profiles">
          {filteredUsers.map((user) => {
            const name = user.name || user.username || 'DevSphere Developer';

            const initials = name
              .split(/\s+/)
              .map((part) => part[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase();

            const skills = Array.isArray(user.skills) ? user.skills : [];

            return (
              <article className="developer-card" key={user.id}>
                <div className="developer-card-top">
                  <div className="developer-avatar">
                    {user.photo ? (
                      <img src={user.photo} alt={`${name} profile`} loading="lazy" />
                    ) : (
                      <span>{initials || 'DS'}</span>
                    )}
                  </div>

                  <span className="developer-status">
                    <span className="online-dot" />
                    Community Member
                  </span>
                </div>

                <div className="developer-info">
                  <h2>{name}</h2>
                  {user.username && (
                    <span className="developer-username">@{user.username}</span>
                  )}

                  {user.email ? (
                    <a className="developer-email" href={`mailto:${user.email}`}>
                      {user.email}
                    </a>
                  ) : (
                    <span className="developer-email muted">Email not provided</span>
                  )}
                </div>

                <div className="developer-company">
                  <span className="company-label">PROFESSIONAL ROLE</span>
                  <strong>{user.role || 'Developer'}</strong>
                </div>

                <div className="developer-company">
                  <span className="company-label">COMPANY & LOCATION</span>
                  <strong>
                    {[user.company, user.city].filter(Boolean).join(' · ') || 'Details not provided'}
                    {user.city ? ', India' : ''}
                  </strong>
                </div>

                <div className="developer-company">
                  <span className="company-label">CONTACT</span>
                  {user.phone ? (
                    <a className="developer-contact-link" href={`tel:${user.phone}`}>
                      {user.phone}
                    </a>
                  ) : (
                    <strong className="developer-detail-muted">Contact not provided</strong>
                  )}
                </div>

                <div className="developer-company developer-skills-section">
                  <span className="company-label">SKILLS & TECHNOLOGIES</span>

                  {skills.length > 0 ? (
                    <div className="chips">
                      {skills.map((skill) => (
                        <span className="chip" key={skill}>{skill}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="developer-detail-muted">Skills not added yet</span>
                  )}
                </div>

                <div className="developer-card-footer">
                  <span className="developer-card-mark">DS <span aria-hidden="true">✦</span></span>
                  <Link to={`/users/${user.id}`} className="profile-btn">
                    View Profile <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="empty-directory" aria-live="polite">
          <div className="directory-empty-icon" aria-hidden="true">⌕</div>
          <span className="directory-eyebrow">NO MATCHES YET</span>
          <h2>No developers found<span className="directory-heading-dot">.</span></h2>
          <p>
            We couldn’t find a profile matching “{search.trim()}”.
            Try a different name, skill, email, or city.
          </p>

          <button
            type="button"
            className="directory-action secondary-btn"
            onClick={() => setSearch('')}
          >
            Clear search <span aria-hidden="true">↻</span>
          </button>
        </section>
      )}
    </main>
  );
};

export default UserDirectory;
