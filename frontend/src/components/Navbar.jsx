import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🎯 PrepInsight</Link>
      </div>
      {user && (
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/study-log">Study Log</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/tests">Tests</Link>
          <Link to="/analysis">Analysis</Link>
          <Link to="/mistakes">Mistake Book</Link>
          <span className="nav-user">👤 {user.name}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;