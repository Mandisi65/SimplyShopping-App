import ProductCard from './ProductCard';
import '../../assets/styles/App.css';

export default function ProductGrid({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div className="empty-grid-container">
        <p>No grocery items found matching your search or category filter.</p>
      </div>
    );
  }

  return (
    <main className="product-grid">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} onAddToCart={onAddToCart} />
      ))}
    </main>
  );
}