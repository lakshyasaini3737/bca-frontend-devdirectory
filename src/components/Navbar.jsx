
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Developers", path: "/users" },
    { name: "Create Post", path: "/add-post" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand" aria-label="DevSphere home">
          <div className="brand-icon">DS</div>

          <div className="brand-text">
            <span className="brand-name">DevSphere</span>
            <span className="brand-tagline">
              Developer Community
            </span>
          </div>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/users" className="explore-btn">
            Explore Developers <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;