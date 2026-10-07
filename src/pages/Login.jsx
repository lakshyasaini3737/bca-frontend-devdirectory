import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    login();

    const redirectPath = location.state?.from?.pathname || "/";

    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">DS</div>

        <span className="section-label">WELCOME BACK</span>

        <h1>Sign in to DevSphere</h1>

        <p className="auth-description">
          Access your developer community and start exploring.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-submit">
            Sign In
            <span>→</span>
          </button>
        </form>

        <div className="auth-divider">
          <span>DEVSPHERE</span>
        </div>

        <p className="auth-footer">
          New to DevSphere?{" "}
          <Link to="/users">Explore Developers</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;