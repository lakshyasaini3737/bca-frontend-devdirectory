import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./components/context/AuthContext.jsx";

import Home from "./pages/Home";
import UserDirectory from "./pages/UserDirectory";
import UserProfile from "./pages/UserProfile";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function GuestOnly({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return (
      <Navigate
        to={location.state?.from?.pathname || "/"}
        replace
      />
    );
  }

  return children;
}

export default function App() {
  return (
    <div className="app-shell">
      <div className="bg-grid"></div>
      <div className="bg-glow glow-one"></div>
      <div className="bg-glow glow-two"></div>

      <Navbar />

      <main className="container page">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/users" element={<UserDirectory />} />

          <Route
            path="/users/:id"
            element={<UserProfile />}
          />

          <Route
            path="/login"
            element={
              <GuestOnly>
                <Login />
              </GuestOnly>
            }
          />

          <Route
            path="/add-post"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div>
            <div className="footer-brand">
              <span className="footer-logo">DS</span>
              <span>DevSphere</span>
            </div>

            <p>
              A modern developer community built with React.
            </p>
          </div>

          <div className="footer-right">
            <span>React</span>
            <span>React Router</span>
            <span>Axios</span>
            <span>JSONPlaceholder API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}