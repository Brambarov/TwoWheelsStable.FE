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
        className="card-image"
      />
      <div className="card-details">
        <h3>{name}</h3>
        <p>
          <strong>Make: </strong> {make}{" "}
        </p>
        <p>
          <strong>Model: </strong> {model}{" "}
        </p>
        <p className="card-owner">Owner: {owner}</p>
      </div>
    </div>
  );
};

export default Card;
