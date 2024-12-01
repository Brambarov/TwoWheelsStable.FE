import MotorcycleDetails from "./features/Motorcycles/MotorcycleDetails";
import MotorcyclesList from "./features/Motorcycles/MotorcyclesList";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isLoggedIn && (
        <header>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </header>
      )}

      {isLoggedIn && (
        <header>
          <button onClick={handleLogout}>Logout</button>
        </header>
      )}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MotorcyclesList />} />
        <Route path="/motorcycles/:id" element={<MotorcycleDetails />} />
      </Routes>
    </div>
  );
};

export default App;
