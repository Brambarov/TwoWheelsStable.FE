import MotorcycleDetails from "./components/Motorcycle/MotorcycleDetails/MotorcycleDetails";
import CreateMotorcycle from "./components/Motorcycle/CreateMotorcycle/CreateMotorcycle";
import UpdateMotorcycle from "./components/Motorcycle/UpdateMotorcycle/UpdateMotorcycle";
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
        <Route
          path="/"
          element={<Gallery fetchMotorcycles={getMotorcycles} />}
        />
        <Route path="/login" element={<Login />} />
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
        <Route path="/motorcycles/new" element={<CreateMotorcycle />} />
        <Route path="/motorcycles/edit/:id" element={<UpdateMotorcycle />} />
        <Route path="/register" element={<Register />} />
        <Route path="/motorcycles/:id" element={<MotorcycleDetails />} />
      </Routes>
    </div>
  );
};

export default App;
