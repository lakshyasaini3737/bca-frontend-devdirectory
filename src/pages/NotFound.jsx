import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>

        <span className="section-label">PAGE NOT FOUND</span>

        <h1>Looks like you got lost.</h1>

        <p>
          The page you are looking for does not exist or may have
          been moved.
        </p>

        <Link to="/" className="primary-btn">
          Back to Home
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;