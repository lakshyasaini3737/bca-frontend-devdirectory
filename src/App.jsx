import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import UserDirectory from './pages/UserDirectory.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NewProject from './pages/NewProject.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddPost from './pages/AddPost.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserDirectory />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-post" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">DevSphere · Built with React, Vite &amp; Axios</footer>
    </>
  );
}