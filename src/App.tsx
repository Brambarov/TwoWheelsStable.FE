import MotorcycleDetails from "./features/Motorcycles/MotorcycleDetails";
import MotorcyclesList from "./features/Motorcycles/MotorcyclesList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MotorcyclesList />} />
        <Route path="/motorcycles/:id" element={<MotorcycleDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
