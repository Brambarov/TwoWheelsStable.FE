import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMotorcycle, updateMotorcycle } from "../../../api";

const UpdateMotorcycle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [motorcycle, setMotorcycle] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        const response = await getMotorcycle(id!);
        setMotorcycle(response.data);
      } catch (err) {
        setError("Failed to fetch motorcycle!");
      }
    };

    fetchMotorcycle();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMotorcycle({ ...motorcycle, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMotorcycle(id!, motorcycle);
      navigate(`/motorcycles/${id}`);
    } catch (err) {
      setError("Failed to update motorcycle!");
    }
  };

  return (
    <div>
      <h2>Update Motorcycle</h2>
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
            type="text"
            name="year"
            value={motorcycle.year}
            onChange={handleInputChange}
          />
          <label>Mileage</label>
          <input
            type="text"
            name="mileage"
            value={motorcycle.mileage}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Motorcycle</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateMotorcycle;