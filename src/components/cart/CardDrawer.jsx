import '../../assets/styles/App.css';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onRunOptimizer
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        {/* Drawer Header */}
        <div className="drawer-header">
          <h2>Selected Grocery Items</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close Cart">
            <img src="/icons/close_dismiss.svg" alt="Close" className="icon-img" />
          </button>
        </div>

        {/* Drawer Body / Items List */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <p className="empty-cart-text">Your grocery basket is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <strong>{item.name}</strong>
                  <div className="cart-item-sub">
                    {item.brand} • R{(item.prices.Shoprite * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="qty-controls">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} aria-label="Decrease quantity">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                  <button className="remove-btn" onClick={() => onRemoveItem(item.id)} aria-label="Remove item">
                    <img src="/icons/trash_delete.svg" alt="Delete" className="icon-img-sm" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Optimizer Trigger */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <button className="optimize-btn" onClick={onRunOptimizer}>
              <img src="/icons/flash_lightening.svg" alt="Optimize Icon" className="btn-icon" />
              <span>Run Split-Basket Optimiser</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}