import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

interface Props {
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ onLogout }) => {
  const {
    userHref: href,
    accessToken: accessToken,
    refreshToken: refreshToken,
  } = useAuth();

  useEffect(() => {
    if (href && accessToken && refreshToken) {
    }
  }, [href, accessToken, refreshToken]);

  return (
    <nav className="tws-navbar">
      <Link className="tws-nav-item" to="/">
        Home
      </Link>
      {accessToken ? (
        <>
          <Link className="tws-nav-item" to="/motorcycles/new">
            Create Motorcycle
          </Link>
          <Link className="tws-nav-item" to="/stable">
            My Stable
          </Link>
          <Link className="tws-nav-item" to="/" onClick={onLogout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link className="tws-nav-item" to="/login">
            Login
          </Link>
          <Link className="tws-nav-item" to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
