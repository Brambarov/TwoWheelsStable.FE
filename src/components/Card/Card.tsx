import "./Card.css";

interface Props {
  name: string;
  make: string;
  model: string;
  owner: string;
  onClick: () => void;
}

const Card: React.FC<Props> = ({ name, make, model, owner, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img
        src="https://via.placeholder.com/250x150.png?text=Motorcycle+Image"
        alt="Motorcycle"
        className="card-image"
      />
      <div className="card-details">
        <h3>{name}</h3>
        <p>
          {make} {model}
        </p>
        <p>Owner: {owner}</p>
      </div>
    </div>
  );
};

export default Card;
