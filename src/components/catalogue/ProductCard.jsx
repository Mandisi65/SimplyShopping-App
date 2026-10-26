export default function ProductCard({ product, onAddToCart }) {
  // Lowest price display baseline
  const minPrice = Math.min(...Object.values(product.prices));

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-meta">
          {product.brand} • {product.size}
        </p>
        <div className="product-price-row">
          <span className="price-label">From</span>
          <span className="price-amount">R{minPrice.toFixed(2)}</span>
        </div>
        <button 
          className="add-to-cart-btn" 
          onClick={() => onAddToCart(product)}
        >
          + Add to Basket
        </button>
      </div>
    </div>
  );
}