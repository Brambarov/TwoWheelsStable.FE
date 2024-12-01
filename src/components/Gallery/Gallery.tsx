import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import "./Gallery.css";
import { toNumber } from "../../utils/Number";

interface Motorcycle {
  id: number;
  name: string;
  make: string;
  model: string;
  owner: string;
}

interface Props {
  fetchMotorcycles: () => Promise<{ data: Motorcycle[] }>;
  minCardsPerRow?: number;
  maxCardsPerRow?: number;
}

const Gallery: React.FC<Props> = ({
  fetchMotorcycles,
  minCardsPerRow = 3,
  maxCardsPerRow = 6,
}) => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [error, setError] = useState("");
  const [cardsPerRow, setCardsPerRow] = useState<number>(3);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMotorcycles();
        setMotorcycles(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch motorcycles!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchMotorcycles]);

  const handleCardsPerRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = toNumber(e.target.value);
    if (newValue && newValue >= minCardsPerRow && newValue <= maxCardsPerRow) {
      setCardsPerRow(newValue);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/motorcycles/${id}`);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="settings">
        <label>Cards per row:</label>
        <input
          type="number"
          value={cardsPerRow}
          onChange={handleCardsPerRowChange}
        />
      </div>

      <div
        className="gallery"
        style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}
      >
        {motorcycles.map((motorcycle) => (
          <Card
            key={motorcycle.id}
            name={motorcycle.name}
            make={motorcycle.make}
            model={motorcycle.model}
            owner={motorcycle.owner}
            onClick={() => handleCardClick(motorcycle.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
