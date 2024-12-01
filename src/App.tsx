import MotorcycleDetails from "./features/Motorcycles/MotorcycleDetails";
import Gallery from "./components/Gallery/Gallery";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import { getMotorcycles, getMotorcyclesByUserId } from "./api";

const App = () => {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Gallery fetchMotorcycles={getMotorcycles} />}
        />
        <Route
          path="/stable"
          element={
            userId && (
              <Gallery
                fetchMotorcycles={() => getMotorcyclesByUserId(userId)}
              />
            )
          }
        />
        <Route path="/motorcycles/:id" element={<MotorcycleDetails />} />
      </Routes>
    </div>
  );
};

export default App;
