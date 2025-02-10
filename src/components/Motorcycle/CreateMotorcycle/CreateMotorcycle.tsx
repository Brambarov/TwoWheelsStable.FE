import { useState } from "react";
import { batchCreate, createMotorcycle } from "../../../api";
import { useNavigate } from "react-router-dom";
import { extractIdFromHref } from "../../../utils/String";
import "./CreateMotorcycles.css";

const CreateMotorcycle: React.FC = () => {
  const [motorcycle, setMotorcycle] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleMotorcycleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMotorcycle({
      ...motorcycle,
      [name]: value,
    });
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
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
      const motorcycleId = extractIdFromHref(response.data.href);

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => formData.append("files", image));

        await batchCreate(motorcycleId, formData);
      }

      navigate(`/motorcycles/${motorcycleId}`);
    } catch (err) {
      setError("Failed to create motorcycle!");
    }
  };

  return (
    <div className="create-motorcycle-container">
      <h2 className="form-title">Add new motorcycle</h2>
      <form onSubmit={handleSubmit} className="create-motorcycle-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={motorcycle.name}
            onChange={handleMotorcycleChange}
          />
        </div>

        <div className="form-group">
          <label>Make</label>
          <input
            type="text"
            name="make"
            value={motorcycle.make}
            onChange={handleMotorcycleChange}
          />
        </div>

        <div className="form-group">
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={motorcycle.model}
            onChange={handleMotorcycleChange}
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={motorcycle.year}
            onChange={handleMotorcycleChange}
          />
        </div>

        <div className="form-group">
          <label>Mileage</label>
          <input
            type="number"
            name="mileage"
            value={motorcycle.mileage}
            onChange={handleMotorcycleChange}
          />
        </div>

        <div className="form-group">
          <label>Images:</label>
          <input type="file" multiple onChange={handleImagesChange} />
        </div>

        <button type="submit">Create Motorcycle</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreateMotorcycle;
