
const ProductCard = ({ title, thumbnail }) => {
  return (
    
      <div className="products__single">
        <img src={thumbnail} alt={title} />
        <span>{title}</span>
      </div>
   
  );
};

export default ProductCard;
