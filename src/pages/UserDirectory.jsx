import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setUsers(response.data);
      } catch (err) {
        setError("Unable to load developers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.company?.name?.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  if (loading) {
    return (
      <div className="directory-state">
        <div className="directory-loader"></div>

        <h3>Finding developers...</h3>

        <p>Loading the DevSphere community.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="directory-state error-state">
        <div className="error-icon">!</div>

        <h3>Something went wrong</h3>

        <p>{error}</p>

        <button
          className="primary-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="directory-page">
      <section className="directory-header">
        <div>
          <span className="section-label">
            DEVELOPER DIRECTORY
          </span>

          <h1>
            Meet the{" "}
            <span className="hero-gradient">
              developers.
            </span>
          </h1>

          <p>
            Explore developers, discover their profiles and learn
            more about their technical interests.
          </p>
        </div>

        <div className="developer-count">
          <strong>{users.length}</strong>
          <span>Developers</span>
        </div>
      </section>

      <section className="directory-toolbar">
        <div className="search-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search by name, username, email or company..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
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
        </div>

        <div className="result-count">
          {filteredUsers.length} result
          {filteredUsers.length !== 1 ? "s" : ""}
        </div>
      </section>

      {filteredUsers.length > 0 ? (
        <section className="developer-grid">
          {filteredUsers.map((user) => {
            const initials = user.name
              .split(" ")
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <article
                className="developer-card"
                key={user.id}
              >
                <div className="developer-card-top">
                  <div className="developer-avatar">
                    {initials}
                  </div>

                  <span className="online-dot"></span>
                </div>

                <div className="developer-info">
                  <h3>{user.name}</h3>

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
                  <span className="company-label">
                    COMPANY
                  </span>

                  <strong>
                    {user.company?.name ||
                      "Independent Developer"}
                  </strong>
                </div>

                <Link
                  to={`/users/${user.id}`}
                  className="profile-btn"
                >
                  View Profile
                  <span>→</span>
                </Link>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="empty-directory">
          <div className="empty-icon">⌕</div>

          <h3>No developers found</h3>

          <p>
            Try searching with a different name, username or
            company.
          </p>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setSearch("")}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDirectory;