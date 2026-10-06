import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('dd_theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dd_theme', theme);
  }, [theme]);

  const close = () => setOpen(false);
  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-logo">{'</>'}</span>
          <span>Dev<b>Directory</b></span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/users" onClick={close}>Developers</NavLink>
          <NavLink to="/add-post" onClick={close}>Write Post</NavLink>

          <button
            className="icon-btn"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label="Switch theme"
            title="Switch theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <div className="nav-user">
              <span className="chip">👋 {user.name.split(' ')[0]}</span>
              <button className="btn btn-sm btn-ghost" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary" onClick={close}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
