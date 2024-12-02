import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import "./Gallery.css";
import { toNumber } from "../../utils/Number";
import { getByResourceId } from "../../api";

interface Motorcycle {
  id: string;
  name: string;
  make: string;
  model: string;
  owner: string;
  image?: string | null;
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
        const motorcycleData = response.data;

        const motorcycleWithImages = await Promise.all(
          motorcycleData.map(async (motorcycle) => {
            try {
              const imagesResponse = await getByResourceId(motorcycle.id);
              const firstImage = imagesResponse.data[0];
              return {
                ...motorcycle,
                image: firstImage
                  ? `data:${firstImage.mimeType};base64,${firstImage.data}`
                  : null,
              };
            } catch {
              return { ...motorcycle, image: null };
            }
          })
        );

        setMotorcycles(motorcycleWithImages);
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

  const handleCardClick = (id: string) => {
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
            image={motorcycle.image}
            onClick={() => handleCardClick(motorcycle.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
