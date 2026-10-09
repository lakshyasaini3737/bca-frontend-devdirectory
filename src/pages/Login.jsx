
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter both your email address and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // Existing AuthContext ko email pass kar rahe hain.
      // Current context mock login hai; password verify nahi hota.
      await login({ email: cleanEmail });

      const redirectPath = location.state?.from?.pathname || "/";

      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-logo" aria-label="DevSphere home">
          DS
        </Link>

        <span className="section-label">WELCOME BACK</span>

        <h1>
          Sign in to <span className="hero-gradient">DevSphere</span>
        </h1>

        <p className="auth-description">
          Continue exploring developer profiles and the DevSphere community.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>

            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="post-message error" role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <div className="auth-divider">
          <span>DEVSPHERE</span>
        </div>

        <p className="auth-footer">
          Want to discover the community?{" "}
          <Link to="/users">Explore Developers</Link>
        </p>

        <Link to="/" className="auth-home-link">
          ← Back to Home
        </Link>
      </section>
    </main>
  );
};

export default Login;