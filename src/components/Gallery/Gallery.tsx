import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import "./Gallery.css";
import { getImageByResourceId } from "../../api";
import { BASE_URL } from "../../api";
import { extractIdFromHref } from "../../utils/String";

interface Motorcycle {
  href: string;
  name: string;
  make: string;
  model: string;
  userName: string;
  image?: string | null;
}

interface Props {
  fetchMotorcycles: () => Promise<{ data: Motorcycle[] }>;
}

const Gallery: React.FC<Props> = ({ fetchMotorcycles: getMotorcycles }) => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getMotorcycles();
        const motorcycleData = response.data;

        const motorcycleWithImages = await Promise.all(
          motorcycleData.map(async (motorcycle) => {
            try {
              const id = extractIdFromHref(motorcycle.href);
              const imagesResponse = await getImageByResourceId(id!);
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
  }, [getMotorcycles]);

  const handleCardClick = (href: string) => {
    const path = href.replace(BASE_URL, "");
    navigate(path);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div
        className="gallery"
        style={{ gridTemplateColumns: `repeat(3, 1fr)` }}
      >
        {motorcycles.map((motorcycle) => (
          <Card
            key={motorcycle.href}
            name={motorcycle.name}
            make={motorcycle.make}
            model={motorcycle.model}
            owner={motorcycle.userName}
            image={motorcycle.image}
            onClick={() => handleCardClick(motorcycle.href)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
