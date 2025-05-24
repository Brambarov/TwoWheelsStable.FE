import { useAuth } from "./context/AuthContext";
import { extractIdFromHref } from "./utils/String";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getMotorcycles, getMotorcyclesByUserId } from "./api";
import Navbar from "./components/Navbar/Navbar";
import Gallery from "./components/Gallery/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GetMotorcycle from "./components/Motorcycle/GetMotorcycle/GetMotorcycle";
import CreateMotorcycle from "./components/Motorcycle/CreateMotorcycle/CreateMotorcycle";
import UpdateMotorcycle from "./components/Motorcycle/UpdateMotorcycle/UpdateMotorcycle";

const App = () => {
  const { userHref: href, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="tws-container-column">
      <h1>Two Wheels Stable</h1>
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
            href && (
              <Gallery
                fetchMotorcycles={() =>
                  getMotorcyclesByUserId(extractIdFromHref(href))
                }
              />
            )
          }
        />
        <Route path="/motorcycles/new" element={<CreateMotorcycle />} />
        <Route path="/motorcycles/edit/:id" element={<UpdateMotorcycle />} />
        <Route path="/register" element={<Register />} />
        <Route path="/motorcycles/:id" element={<GetMotorcycle />} />
      </Routes>
    </div>
  );
};

export default App;
