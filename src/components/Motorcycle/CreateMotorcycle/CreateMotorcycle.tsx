import { useState } from "react";
import { createMotorcycle } from "../../../api";
import { useNavigate } from "react-router-dom";

const CreateMotorcycle: React.FC = () => {
  const [motorcycle, setMotorcycle] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMotorcycle({
      ...motorcycle,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !motorcycle.name ||
      !motorcycle.make ||
      !motorcycle.model ||
      !motorcycle.year ||
      !motorcycle.mileage
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await createMotorcycle(motorcycle);
      navigate(`/motorcycles/${response.data.id}`);
    } catch (err) {
      setError("Failed to create motorcycle!");
    }
  };

  return (
    <div>
      <h2>Add Motorcycle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={motorcycle.name}
            onChange={handleInputChange}
          />
          <label>Make</label>
          <input
            type="text"
            name="make"
            value={motorcycle.make}
            onChange={handleInputChange}
          />
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={motorcycle.model}
            onChange={handleInputChange}
          />
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={motorcycle.year}
            onChange={handleInputChange}
          />
          <label>Mileage</label>
          <input
            type="number"
            name="mileage"
            value={motorcycle.mileage}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Motorcycle</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateMotorcycle;
