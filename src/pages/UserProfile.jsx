
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchDeveloper,
  fetchDeveloperPosts,
} from "../services/api";

export default function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const [developer, developerPosts] = await Promise.all([
          fetchDeveloper(id),
          fetchDeveloperPosts(id),
        ]);

        if (cancelled) return;

        if (!developer) {
          setError(
            "This profile was not found. Please return to the developer directory."
          );
          setUser(null);
          setPosts([]);
          return;
        }

        setUser(developer);
        setPosts(developerPosts);
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load this profile. Please check your internet connection."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="directory-state">
        <div className="directory-loader" />
        <h2>Loading Developer Profile...</h2>
        <p>Fetching profile and contact details from the API.</p>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="directory-state error-state">
        <h2>Profile Unavailable</h2>
        <p>{error || "This developer profile could not be found."}</p>
        <Link to="/users" className="primary-btn">
          Back to Developers
        </Link>
      </main>
    );
  }

  const address = user.address || {};

  return (
    <main className="profile-page">
      <Link to="/users" className="profile-back-link">
        ← Back to Developers
      </Link>

      <section className="profile-hero">
        <div className="profile-hero-content">
          <div className="profile-avatar">
            {user.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                }}
              />
            ) : (
              (user.name || "D")
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            )}
          </div>

          <div className="profile-main-info">
            <span className="section-label">DEVSPHERE MEMBER</span>
            <h1>{user.name}</h1>
            <p>@{user.username}</p>
            <span className="profile-role-badge">
              {user.role || "Software Developer"}
            </span>
          </div>
        </div>
      </section>

      <section className="profile-grid">
        <article className="profile-info-card">
          <h2 className="profile-card-heading">
            Contact Information
          </h2>

          <div className="profile-detail">
            <span className="section-label">EMAIL ADDRESS</span>
            <a href={`mailto:${user.email}`}>{user.email || "Not provided"}</a>
          </div>

          <div className="profile-detail">
            <span className="section-label">PHONE NUMBER</span>
            {user.phone ? (
              <a href={`tel:${user.phone}`}>{user.phone}</a>
            ) : (
              <span>Not provided by API</span>
            )}
          </div>

          {user.website && (
            <div className="profile-detail">
              <span className="section-label">WEBSITE</span>
              <a
                href={
                  user.website.startsWith("http")
                    ? user.website
                    : `https://${user.website}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
            </div>
          )}
        </article>

        <article className="profile-info-card">
          <h2 className="profile-card-heading">Location Details</h2>

          <div className="profile-detail">
            <span className="section-label">COUNTRY</span>
            <span>{address.country || "India"}</span>
          </div>

          <div className="profile-detail">
            <span className="section-label">CITY</span>
            <span>{address.city || "Not provided"}</span>
          </div>

          <div className="profile-detail">
            <span className="section-label">STREET ADDRESS</span>
            <span>{address.street || "Not provided"}</span>
          </div>

          <div className="profile-detail">
            <span className="section-label">PIN CODE</span>
            <span>{address.zipcode || "Not provided by API"}</span>
          </div>
        </article>

        <article className="profile-info-card">
          <h2 className="profile-card-heading">
            Professional Details
          </h2>

          <div className="profile-detail">
            <span className="section-label">ORGANIZATION</span>
            <span>{user.company?.name || "Not provided"}</span>
          </div>

          <div className="profile-detail">
            <span className="section-label">PROFESSIONAL ROLE</span>
            <span>{user.role || "Software Developer"}</span>
          </div>

          <div className="profile-detail">
            <span className="section-label">AREA OF EXPERTISE</span>
            <span>{user.focus || "Web Development"}</span>
          </div>
        </article>
      </section>

      <section className="profile-posts">
        <div className="section-heading">
          <span className="section-label">COMMUNITY ACTIVITY</span>
          <h2>Latest Posts</h2>
          <p>Posts loaded from the posts API.</p>
        </div>

        {posts.length > 0 ? (
          <div className="posts-list">
            {posts.slice(0, 6).map((post, index) => (
              <article className="profile-post-card" key={post.id}>
                <span className="post-number">
                  #{String(index + 1).padStart(2, "0")}
                </span>

                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="profile-info-card">
            No posts are available for this profile yet.
          </div>
        )}
      </section>

      <section className="profile-cta">
        <h2>Explore the DevSphere Community</h2>
        <p>Discover more profiles and explore the developer directory.</p>
        <Link to="/users" className="primary-btn">
          Explore Developers →
        </Link>
      </section>
    </main>
  );
}