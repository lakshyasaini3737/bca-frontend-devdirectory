import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState({});

  const errors = {
    name: form.name.trim().length < 2 ? 'Please enter your name (min 2 characters).' : '',
    email: !EMAIL_RE.test(form.email) ? 'Enter a valid email address.' : '',
  };
  const isValid = !errors.name && !errors.email;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const signIn = (payload) => {
    login(payload);
    navigate(from, { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (isValid) signIn({ name: form.name.trim(), email: form.email.trim() });
  };

  return (
    <div className="auth-wrap">
      <form className="card auth-card" onSubmit={handleSubmit} noValidate>
        <span className="auth-emoji">🔐</span>
        <h1>Welcome back</h1>
        <p className="muted">
          {from !== '/'
            ? <>Sign in to continue to <b className="mono">{from}</b></>
            : 'Sign in to publish bulletins for your team.'}
        </p>

        <label className="field">
          <span>Full name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
          {touched.name && errors.name && <small className="field-error">{errors.name}</small>}
        </label>

        <label className="field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="ada@company.dev"
            autoComplete="email"
          />
          {touched.email && errors.email && <small className="field-error">{errors.email}</small>}
        </label>

        <button className="btn btn-primary btn-block" type="submit">Sign in</button>
        <div className="divider"><span>or</span></div>
        <button
          type="button"
          className="btn btn-ghost btn-block"
          onClick={() => signIn({ name: 'Demo Manager', email: 'demo@devdirectory.dev' })}
        >
          ⚡ Continue as demo manager
        </button>
        <p className="muted tiny">This is a simulated session — no real credentials are used.</p>
      </form>
    </div>
  );
}
