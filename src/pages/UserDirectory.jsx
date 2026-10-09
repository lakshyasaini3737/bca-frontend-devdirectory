
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDevelopers } from "../services/api";

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadDevelopers() {
      try {
        setLoading(true);
        setError("");

        const developers = await fetchDevelopers();

        if (!cancelled) {
          setUsers(developers);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load developer profiles. Check your internet connection and try again."
          );
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
    const keyword = search.toLowerCase().trim();

    if (!keyword) return users;

    return users.filter((user) => {
      const fields = [
        user.name,
        user.username,
        user.email,
        user.company?.name,
        user.address?.city,
        user.address?.country,
        user.role,
        user.focus,
      ];

      return fields.some((field) =>
        String(field ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  if (loading) {
    return (
      <main className="directory-state">
        <div className="directory-loader" />
        <h2>Discovering Developers</h2>
        <p>Loading profiles from the API...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="directory-state error-state">
        <div className="error-icon">!</div>
        <h2>Unable to Load Developers</h2>
        <p>{error}</p>
        <button
          type="button"
          className="directory-action"
          onClick={() => setRetry((value) => value + 1)}
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="directory-page">
      <section className="directory-header">
        <div className="directory-heading-copy">
          <span className="directory-eyebrow">
            ✦ DEVSPHERE COMMUNITY
          </span>

          <h1>
            Meet the <span className="hero-gradient">Developers.</span>
          </h1>

          <p>
            Explore developer profiles, discover new skills, and connect
            with a growing technology community.
          </p>
        </div>

        <div className="developer-count">
          <strong>{users.length}</strong>
          <span>Developer Profiles</span>
        </div>
      </section>

      <section className="directory-toolbar">
        <label className="search-wrapper">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search name, role, skills, email or city..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search developers"
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <span className="result-count">
          <span className="result-count-number">
            {filteredUsers.length}
          </span>{" "}
          {filteredUsers.length === 1 ? "developer" : "developers"} found
        </span>
      </section>

      {filteredUsers.length > 0 ? (
        <section className="developer-grid">
          {filteredUsers.map((user) => {
            const initials = (user.name || "Developer")
              .split(/\s+/)
              .map((part) => part[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <article className="developer-card" key={user.id}>
                <div className="developer-card-top">
                  <div className="developer-avatar">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        loading="lazy"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>

                  <span className="developer-status">
                    <span className="online-dot" />
                    API Profile
                  </span>
                </div>

                <div className="developer-info">
                  <h2>{user.name}</h2>
                  <span className="developer-username">
                    @{user.username}
                  </span>

                  <a
                    href={`mailto:${user.email}`}
                    className="developer-email"
                  >
                    {user.email}
                  </a>
                </div>

                <div className="developer-company">
                  <span className="company-label">PROFESSIONAL ROLE</span>
                  <strong>{user.role || "Software Developer"}</strong>
                </div>

                <div className="developer-company">
                  <span className="company-label">AREA OF EXPERTISE</span>
                  <strong>{user.focus || "Web Development"}</strong>
                </div>

                <div className="developer-company">
                  <span className="company-label">LOCATION</span>
                  <strong>
                    {[user.address?.city, user.address?.country]
                      .filter(Boolean)
                      .join(", ") || "Location not provided"}
                  </strong>
                </div>

                <div className="developer-card-footer">
                  <span className="developer-card-mark">DS ✦</span>

                  <Link
                    to={`/users/${user.id}`}
                    className="profile-btn"
                  >
                    View Profile <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="empty-directory">
          <div className="empty-icon">⌕</div>
          <h2>No Developers Found</h2>
          <p>
            No profiles match your search. Try another name, skill, email,
            or location.
          </p>
          <button
            type="button"
            className="directory-action secondary-btn"
            onClick={() => setSearch("")}
          >
            Clear Search
          </button>
        </section>
      )}
    </main>
  );
};

export default UserDirectory;