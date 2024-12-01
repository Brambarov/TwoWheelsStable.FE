import { useEffect, useState } from "react";
import { getMotorcycleById } from "../../api";
import { useParams } from "react-router-dom";
import { toNumber } from "../../utils/Number";

const MotorcycleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motorcycle, setMotorcycle] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMotorcycle = async (id: number) => {
      try {
        const response = await getMotorcycleById(id);
        setMotorcycle(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch motorcycle!");
      }
    };

    const numId = toNumber(id);
    if (numId) {
      fetchMotorcycle(numId);
    }
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!motorcycle) return <p>Loading...</p>;

  return (
    <div>
      <h1>{motorcycle.name}</h1>
      <p>
        {motorcycle.make} {motorcycle.model}
      </p>
      <p>{motorcycle.year}</p>
    </div>
  );
};

export default MotorcycleDetails;
