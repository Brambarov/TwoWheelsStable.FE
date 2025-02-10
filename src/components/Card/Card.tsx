import "./Card.css";

interface Props {
  name: string;
  make: string;
  model: string;
  owner: string;
  image?: string | null;
  onClick: () => void;
}

const Card: React.FC<Props> = ({
  name,
  make,
  model,
  owner,
  image,
  onClick,
}) => {
  return (
    <div className="card" onClick={onClick}>
      <img
        src={
          image ||
          "https://via.placeholder.com/250x150.png?text=Motorcycle+Image"
        }
        alt="Motorcycle"
      />
      <div className="card-details">
        <h3>
          {name} - {make} {model}
        </h3>
        <p>Owner: {owner}</p>
      </div>
    </div>
  );
};

export default Card;
