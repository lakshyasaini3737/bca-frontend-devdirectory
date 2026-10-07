import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const [userResponse, postsResponse] = await Promise.all([
          axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          ),
          axios.get(
            `https://jsonplaceholder.typicode.com/posts?userId=${id}`
          ),
        ]);

        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (err) {
        setError("Unable to load this developer profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="profile-state">
        <div className="directory-loader"></div>

        <h3>Loading profile...</h3>

        <p>
          Getting developer information from DevSphere API.
        </p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-state">
        <div className="error-icon">!</div>

        <h3>Profile not found</h3>

        <p>
          {error || "The requested developer does not exist."}
        </p>

        <Link to="/users" className="primary-btn">
          Back to Developers
          <span>→</span>
        </Link>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="profile-page">
      <Link to="/users" className="back-link">
        ← Back to Developers
      </Link>

      <section className="profile-hero">
        <div className="profile-avatar">
          {initials}
        </div>

        <div className="profile-main-info">
          <div className="profile-status">
            <span></span>
            Available for collaboration
          </div>

          <h1>{user.name}</h1>

          <p className="profile-username">
            @{user.username}
          </p>

          <p className="profile-company">
            {user.company?.name || "Independent Developer"}
          </p>
        </div>
      </section>

      <section className="profile-grid">
        <div className="profile-info-card">
          <div className="profile-card-heading">
            <span>01</span>
            <h3>Contact</h3>
          </div>

          <div className="profile-detail">
            <span>Email</span>
            <a href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </div>

          <div className="profile-detail">
            <span>Phone</span>
            <strong>{user.phone}</strong>
          </div>

          <div className="profile-detail">
            <span>Website</span>

            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
          </div>
        </div>

        <div className="profile-info-card">
          <div className="profile-card-heading">
            <span>02</span>
            <h3>Location</h3>
          </div>

          <div className="profile-detail">
            <span>City</span>
            <strong>{user.address?.city}</strong>
          </div>

          <div className="profile-detail">
            <span>Street</span>
            <strong>{user.address?.street}</strong>
          </div>

          <div className="profile-detail">
            <span>Zipcode</span>
            <strong>{user.address?.zipcode}</strong>
          </div>
        </div>

        <div className="profile-info-card">
          <div className="profile-card-heading">
            <span>03</span>
            <h3>Company</h3>
          </div>

          <div className="profile-detail">
            <span>Organization</span>
            <strong>{user.company?.name}</strong>
          </div>

          <div className="profile-detail">
            <span>Role</span>
            <strong>Developer</strong>
          </div>

          <div className="profile-detail">
            <span>Focus</span>
            <strong>Technology & Innovation</strong>
          </div>
        </div>
      </section>

      <section className="profile-posts">
        <div className="section-heading">
          <span className="section-label">
            COMMUNITY ACTIVITY
          </span>

          <h2>
            Latest{" "}
            <span className="hero-gradient">
              posts.
            </span>
          </h2>

          <p>
            Recent posts associated with this developer.
          </p>
        </div>

        <div className="posts-list">
          {posts.length > 0 ? (
            posts.slice(0, 4).map((post) => (
              <article
                className="profile-post-card"
                key={post.id}
              >
                <div className="post-number">
                  #{String(post.id).padStart(2, "0")}
                </div>

                <div>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-posts">
              <p>No posts available for this developer.</p>
            </div>
          )}
        </div>
      </section>

      <section className="profile-cta">
        <div>
          <span className="section-label">
            DEVSPHERE COMMUNITY
          </span>

          <h2>
            Discover more{" "}
            <span className="hero-gradient">
              developers.
            </span>
          </h2>
        </div>

        <Link to="/users" className="primary-btn">
          Explore Directory
          <span>→</span>
        </Link>
      </section>
    </div>
  );
};

export default UserProfile;