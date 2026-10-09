import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./context/AuthContext.jsx";
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Remember the attempted path so Login can send the user back after signing in.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
