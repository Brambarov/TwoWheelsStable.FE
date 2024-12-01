import React, { useEffect, useState } from "react";
import { getMotorcycles } from "../../api";
import { useNavigate } from "react-router-dom";

const MotorcyclesList: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await getMotorcycles();
        setMotorcycles(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch motorcycles!");
      }
    };

    fetchMotorcycles();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {motorcycles.map((motorcycle: any) => (
        <div key={motorcycle.id}>
          <h3>{motorcycle.name}</h3>
          <p>
            {motorcycle.make} {motorcycle.model}
          </p>
          <button onClick={() => navigate(`/motorcycles/${motorcycle.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default MotorcyclesList;
