import { useState } from "react";
import { batchCreate, createMotorcycle } from "../../../api";
import { useNavigate } from "react-router-dom";
import { extractIdFromHref } from "../../../utils/String";

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
    <div className="tws-form-container">
      <h2 className="tws-form-title">Add new motorcycle</h2>
      <form content="tws-form" onSubmit={handleSubmit} className="tws-form">
        <div className="tws-form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={motorcycle.name}
            onChange={handleMotorcycleChange}
          />
          <label>Make</label>
          <input
            type="text"
            name="make"
            value={motorcycle.make}
            onChange={handleMotorcycleChange}
          />
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={motorcycle.model}
            onChange={handleMotorcycleChange}
          />
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={motorcycle.year}
            onChange={handleMotorcycleChange}
          />
          <label>Mileage</label>
          <input
            type="number"
            name="mileage"
            value={motorcycle.mileage}
            onChange={handleMotorcycleChange}
          />
          <label>Images:</label>
          <input type="file" multiple onChange={handleImagesChange} />
        </div>

        <button className="tws-button-submit" type="submit">
          Create Motorcycle
        </button>
      </form>

      {error && <p className="tws-error-message">{error}</p>}
    </div>
  );
};

export default CreateMotorcycle;
