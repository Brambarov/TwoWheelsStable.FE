import "./MotorcycleHeader.css";

const MotorcycleHeader: React.FC<{
  motorcycle: any;
  images: string[];
}> = ({ motorcycle, images }) => {
  return (
    <div className="motorcycle-header">
      {images.length > 0 && (
        <img className="motorcycle-image" src={images[0]} alt="Motorcycle" />
      )}
      <div className="motorcycle-info">
        <h1>{motorcycle.name}</h1>
        <p>
          {motorcycle.make} {motorcycle.model}, {motorcycle.year},{" "}
          {motorcycle.mileage} km
        </p>
      </div>
    </div>
  );
};

export default MotorcycleHeader;
