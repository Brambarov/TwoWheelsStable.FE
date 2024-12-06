const MotorcycleHeader: React.FC<{
  motorcycle: any;
  images: string[];
}> = ({ motorcycle, images }) => {
  return (
    <div>
      {images.length > 0 && (
        <img src={images[0]} alt="Motorcycle" style={{ maxWidth: "100%" }} />
      )}
      <h1>{motorcycle.name}</h1>
      <p>{motorcycle.make}</p>
      <p>{motorcycle.model}</p>
      <p>{motorcycle.year}</p>
      <p>{motorcycle.mileage}</p>
      <p>{motorcycle.owner}</p>
    </div>
  );
};

export default MotorcycleHeader;
