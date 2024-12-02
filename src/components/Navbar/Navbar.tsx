import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

interface Props {
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ onLogout }) => {
  const { userId, token } = useAuth();

  useEffect(() => {
    if (userId && token) {
    }
  }, [userId, token]);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">
        Home
      </Link>
      {token ? (
        <>
          <Link to="/motorcycles/new" className="nav-item">
            Create Motorcycle
          </Link>
          <Link to="/stable" className="nav-item">
            My Stable
          </Link>
          <button onClick={onLogout} className="nav-item logout-button">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-item">
            Login
          </Link>
          <Link to="/register" className="nav-item">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
