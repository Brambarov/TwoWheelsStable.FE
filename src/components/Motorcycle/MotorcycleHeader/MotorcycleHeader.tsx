const MotorcycleHeader: React.FC<{
  motorcycle: any;
  images: string[];
}> = ({ motorcycle, images }) => {
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
