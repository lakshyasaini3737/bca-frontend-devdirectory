
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [skills, setSkills] = useState('');
  const [previousProject, setPreviousProject] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignup = mode === 'signup';

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (isSignup) {
      if (!name.trim() || !phone.trim() || !city.trim() || !skills.trim()) {
        setError('Please complete all required fields.');
        return;
      }

      if (!/^[0-9+\-\s()]{8,20}$/.test(phone.trim())) {
        setError('Please enter a valid contact number.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      const user = isSignup
        ? {
            name: name.trim(),
            email: cleanEmail,
            role,
            phone: phone.trim(),
            city: city.trim(),
            skills: skills
              .split(',')
              .map((skill) => skill.trim())
              .filter(Boolean),
            previousProject: previousProject.trim(),
          }
        : { email: cleanEmail };

      // Demo authentication only; this does not verify passwords.
      // Do not use this mock flow for real accounts.
      login(user);

      navigate(location.state?.from?.pathname || '/', {
        replace: true,
      });
    } catch {
      setError('Unable to continue. Please try again.');
      setLoading(false);
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setError('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-logo">
          Dev<span>Sphere</span>
        </Link>

        <p className="section-label">
          {isSignup ? 'JOIN THE COMMUNITY' : 'WELCOME BACK'}
        </p>

        <h1>
          {isSignup ? 'Create your ' : 'Sign in to '}
          <span className="hero-gradient">DevSphere</span>
        </h1>

        <p className="auth-description">
          {isSignup
            ? 'Create your developer profile and connect with the community.'
            : 'Continue exploring developer profiles and the DevSphere community.'}
        </p>

        <div className="auth-form">
          <div className="auth-mode-switch">
            <button
              type="button"
              className={mode === 'login' ? 'auth-submit' : ''}
              onClick={() => changeMode('login')}
            >
              Sign In
            </button>

            <button
              type="button"
              className={mode === 'signup' ? 'auth-submit' : ''}
              onClick={() => changeMode('signup')}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <div className="form-group">
                  <label htmlFor="signup-name">Full Name *</label>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-role">I am a *</label>
                  <select
                    id="signup-role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option>Student</option>
                    <option>Developer</option>
                    <option>Freelancer</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="login-email">Email Address *</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            {isSignup && (
              <>
                <div className="form-group">
                  <label htmlFor="signup-phone">Contact Number *</label>
                  <input
                    id="signup-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your contact number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-city">City / Location *</label>
                  <input
                    id="signup-city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-skills">Skills *</label>
                  <input
                    id="signup-skills"
                    type="text"
                    placeholder="React, JavaScript, CSS"
                    value={skills}
                    onChange={(event) => setSkills(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-project">
                    Previous Project / Portfolio (Optional)
                  </label>
                  <input
                    id="signup-project"
                    type="text"
                    placeholder="Project name or portfolio URL"
                    value={previousProject}
                    onChange={(event) =>
                      setPreviousProject(event.target.value)
                    }
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="login-password">Password *</label>
              <input
                id="login-password"
                type="password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                placeholder="At least 8 characters"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {isSignup && (
              <div className="form-group">
                <label htmlFor="signup-confirm-password">
                  Confirm Password *
                </label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter password again"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                />
              </div>
            )}

            {error && (
              <p className="post-message error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : isSignup
                  ? 'Create Account →'
                  : 'Sign In →'}
            </button>
          </form>
        </div>

        <div className="auth-divider">
          <span>DEVSPHERE</span>
        </div>

        <p className="auth-footer">
          {isSignup ? 'Already have an account? ' : 'New to DevSphere? '}
          <button
            type="button"
            className="auth-text-button"
            onClick={() => changeMode(isSignup ? 'login' : 'signup')}
          >
            {isSignup ? 'Sign In' : 'Create an account'}
          </button>
        </p>

        <p className="auth-footer">
          Want to discover the community? <Link to="/users">Explore Developers</Link>
        </p>

        <Link to="/" className="auth-home-link">
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
