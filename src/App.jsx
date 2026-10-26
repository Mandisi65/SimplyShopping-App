import { useState } from 'react';
import inventoryData from './data/inventory.json';
import './assets/styles/App.css';

export default function App() {
  // State management
  const [budget, setBudget] = useState(500);
  const [selectedCluster, setSelectedCluster] = useState('Centurion Mall Cluster');
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showOptimizedDashboard, setShowOptimizedDashboard] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Categories
  const categories = ['All', 'Bakery', 'Pantry', 'Staples', 'Butchery', 'Dairy'];

  // Add / Remove / Update Cart Items
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, isMandatory: true }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Calculate Base Estimated Total
  const estimatedTotal = cart.reduce(
    (sum, item) => sum + (item.prices?.Shoprite || 0) * item.quantity,
    0
  );

  const budgetUsagePercent = Math.min((estimatedTotal / (budget || 1)) * 100, 100);

  // Filter products by category and search query
  const filteredProducts = inventoryData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* HEADER & BRANDING */}
      <header className="app-header">
        <div className="logo-row">
          <div className="brand-logo-container">
            <img 
              src="/icons/SimplyShopping.png" 
              alt="SimplyShopping Logo" 
              className="brand-logo-img" 
            />
          </div>
          <button
            className="admin-btn"
            onClick={() => setShowAdminModal(true)}
            title="Demonstrate AI Catalogue Ingestion"
          >
            <img src="/icons/ai_robot.svg" alt="AI Robot" className="btn-icon" />
            <span>AI Catalogue (Admin)</span>
          </button>
        </div>

        <div className="control-grid">
          <div className="input-group">
            <label className="label">Max Budget Cap (R):</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="text-input"
            />
          </div>

          <div className="input-group">
            <label className="label">
              <img src="/icons/location.svg" alt="Location" className="label-icon" />
              Store Cluster Location:
            </label>
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="text-input"
            >
              <option>Centurion Mall Cluster (Shoprite, Checkers, PnP)</option>
              <option>Cape Town CBD Cluster (Shoprite, Checkers)</option>
            </select>
          </div>
        </div>

        {/* Budget Progress Guardrail (>75% turns red) */}
        <div className="progress-container">
          <div className="progress-labels">
            <span>Estimated Total: R{estimatedTotal.toFixed(2)}</span>
            <span>Budget Limit: R{budget}</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${budgetUsagePercent}%`,
                backgroundColor: budgetUsagePercent > 75 ? '#e63946' : '#3380D3',
              }}
            />
          </div>
        </div>
      </header>

      {/* SEARCH & CATEGORY CHIPS */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search items by name or brand (e.g., Bread, Albany, Sunflower Oil)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`chip ${activeCategory === cat ? 'active-chip' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT CATALOGUE GRID */}
      <main className="product-grid">
        {filteredProducts.map((item) => {
          const minPrice = Math.min(...Object.values(item.prices));
          return (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} className="card-img" />
              <div className="card-body">
                <span className="category-badge">{item.category}</span>
                <h3 className="card-title">{item.name}</h3>
                <p className="card-meta">{item.brand} • {item.size}</p>
                <p className="card-price">From R{minPrice.toFixed(2)}</p>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  + Add to Basket
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* FLOATING CART BUTTON */}
      <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
        <span>Basket ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
      </button>

      {/* CART DRAWER MODAL */}
      {isCartOpen && (
        <div className="drawer-overlay">
          <div className="drawer">
            <div className="drawer-header">
              <h2>Selected Grocery Items</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                <img src="/icons/close_dismiss.svg" alt="Close" className="icon-img" />
              </button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <p>Your grocery basket is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <strong>{item.name}</strong>
                      <div className="cart-item-sub">
                        {item.brand} • R{(item.prices.Shoprite * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        <img src="/icons/trash_delete.svg" alt="Delete" className="icon-img-sm" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-footer">
                <button
                  className="optimize-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    setShowOptimizedDashboard(true);
                  }}
                >
                  <img src="/icons/flash_lightening.svg" alt="Optimize" className="btn-icon" />
                  <span>Run Split-Basket Optimiser</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SPLIT-BASKET OPTIMISATION DASHBOARD */}
      {showOptimizedDashboard && (
        <div className="drawer-overlay">
          <div className="dashboard-modal">
            <div className="drawer-header">
              <h2>Basket Optimisation Results</h2>
              <button className="close-btn" onClick={() => setShowOptimizedDashboard(false)}>
                <img src="/icons/close_dismiss.svg" alt="Close" className="icon-img" />
              </button>
            </div>

            {/* Suggestions Toggle Setting */}
            <div className="setting-toggle-box">
              <label>
                <input
                  type="checkbox"
                  checked={showSuggestions}
                  onChange={(e) => setShowSuggestions(e.target.checked)}
                />{' '}
                Enable Smart AI Substitutions & Savings Alerts
              </label>
            </div>

            <h3 className="section-header">Single Store Cost Comparison</h3>
            <div className="dashboard-grid">
              <div className="dash-card cheapest-card">
                <div className="card-header-icon">
                  <h4>Shoprite</h4>
                  <img src="/icons/trophy.svg" alt="Cheapest Store" className="icon-img-trophy" />
                </div>
                <p className="dash-price">R{(estimatedTotal * 0.95).toFixed(2)}</p>
                <span className="save-tag">Cheapest Single Store</span>
              </div>
              <div className="dash-card">
                <h4>Checkers</h4>
                <p className="dash-price">R{estimatedTotal.toFixed(2)}</p>
              </div>
              <div className="dash-card">
                <h4>Pick n Pay</h4>
                <p className="dash-price">R{(estimatedTotal * 1.04).toFixed(2)}</p>
              </div>
            </div>

            <h3 className="section-header">
              <img src="/icons/location.svg" alt="Route Location" className="header-icon" />
              Optimal Multi-Store Split Route ({selectedCluster})
            </h3>
            <div className="hero-split-card">
              <p><strong>Route Strategy:</strong> Split basket across nearby stores to maximize total savings.</p>
              <div className="split-group">
                <h5>Buy at Shoprite:</h5>
                <ul>
                  {cart.slice(0, Math.ceil(cart.length / 2)).map(item => (
                    <li key={item.id}>{item.name} ({item.size}) — R{item.prices.Shoprite}</li>
                  ))}
                </ul>
              </div>
              <div className="split-group">
                <h5>Buy at Checkers (300m away):</h5>
                <ul>
                  {cart.slice(Math.ceil(cart.length / 2)).map(item => (
                    <li key={item.id}>{item.name} ({item.size}) — R{item.prices.Checkers}</li>
                  ))}
                </ul>
              </div>
              <div className="total-savings-banner">
                Optimized Total Split Cost: R{(estimatedTotal * 0.88).toFixed(2)} | <strong>Total Savings: R{(estimatedTotal * 0.12).toFixed(2)}!</strong>
              </div>
            </div>

            {showSuggestions && (
              <div className="suggestion-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/icons/alert_banner.svg" alt="Alert" className="icon-img" />
                    <h4>AI Smart Substitution Alert</h4>
                  </div>
                  <button className="close-btn" onClick={() => setShowSuggestions(false)}>
                    <img src="/icons/close_dismiss.svg" alt="Close Alert" className="icon-img-sm" />
                  </button>
                </div>
                <p>
                  Swap branded items with available <strong>Housebrand alternatives</strong> at Shoprite to save an additional <strong>R15.00</strong> on your current basket!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN AI INGESTION MODAL */}
      {showAdminModal && (
        <div className="drawer-overlay">
          <div className="admin-modal">
            <h2>AI Catalogue Parser (Admin Preview)</h2>
            <p>Automated PDF catalogue parsing engine extracting item matrices into structured JSON database.</p>
            <div className="upload-area">
              📁 Upload Retailer PDF Catalogue (e.g., Weekly_Specials_October.pdf)
            </div>
            <p className="status-message">
              <img src="/icons/check_circle.svg" alt="Status OK" className="icon-img-sm" />
              <span>Status: 20 Items Parsed & Successfully Synchronized.</span>
            </p>
            <button className="close-btn-text" onClick={() => setShowAdminModal(false)}>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}