import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { extractIdFromHref } from "../../../utils/String";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import { deleteResource } from "../../../api";

const MotorcycleHeader: React.FC<{
  motorcycle: any;
  images: string[];
}> = ({ motorcycle, images }) => {
  const { userHref: href } = useAuth();
  const motorcycleHref = `${location.pathname}`;
  const motorcycleId = extractIdFromHref(motorcycleHref);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await deleteResource(motorcycleHref);
      navigate("/stable");
    } catch (err) {
      setError("Failed to delete motorcycle!");
    } finally {
      setShowConfirmation(false);
    }
  };

  if (error) return <p>{error}</p>;
  if (!motorcycle) return <p>Loading...</p>;

  return (
    <div className="tws-motorcycle-header">
      {images.length > 0 && (
        <img
          className="tws-motorcycle-image"
          src={images[0]}
          alt="Motorcycle"
        />
      )}
      <div className="tws-motorcycle-info">
        <h2>{motorcycle.name}</h2>
        <p>
          {motorcycle.make} {motorcycle.model}, {motorcycle.year},{" "}
          {motorcycle.mileage} km
        </p>
      </div>

      {motorcycle.userHref === href && (
        <>
          <button
            className="tws-button-warning"
            onClick={() =>
              navigate(`/motorcycles/edit/${motorcycleId}`, {
                state: { href: motorcycleHref },
              })
            }
          >
            Update
          </button>

          <button
            className="tws-button-danger"
            onClick={() => {
              setShowConfirmation(true);
            }}
          >
            Delete
          </button>
        </>
      )}

      {showConfirmation && (
        <ConfirmModal
          message="Are you sure you want to delete this motorcycle?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default MotorcycleHeader;
