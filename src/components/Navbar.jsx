import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('devsphere_theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('devsphere_theme', theme);
  }, [theme]);

  const close = () => setOpen(false);
  const link = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo" onClick={close}>Dev<span>Sphere</span></Link>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        <nav className={open ? 'nav open' : 'nav'}>
          <NavLink to="/" end className={link} onClick={close}>Home</NavLink>
          <NavLink to="/users" className={link} onClick={close}>Developers</NavLink>
          <NavLink to="/projects" className={link} onClick={close}>Projects</NavLink>
          {user && <NavLink to="/dashboard" className={link} onClick={close}>My Work</NavLink>}
          {user && <NavLink to="/add-post" className={link} onClick={close}>Bulletin</NavLink>}
          <button className="btn btn-ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          {user ? (
            <button className="btn" onClick={() => { logout(); close(); navigate('/'); }}>Logout ({user.name.split(' ')[0]})</button>
          ) : (
            <Link to="/login" className="btn btn-primary" onClick={close}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}