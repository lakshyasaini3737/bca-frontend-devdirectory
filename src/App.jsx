import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import UserDirectory from './pages/UserDirectory';
import UserProfile from './pages/UserProfile';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// /login is for guests only - signed-in users get sent back where they came from.
function GuestOnly({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  }
  return children;
}

export default function App() {
  return (
    <div className="app-shell">
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <Navbar />

      <main className="container page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserDirectory />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
          <Route
            path="/add-post"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          Built with ❤️ using React, React Router &amp; Axios · Data from JSONPlaceholder
        </div>
      </footer>
    </div>
  );
}
