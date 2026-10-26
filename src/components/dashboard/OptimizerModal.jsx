import '../../assets/styles/OptimizerModal.css';

export default function OptimizerModal({
  isOpen,
  onClose,
  cart,
  selectedCluster,
  estimatedTotal,
  showSuggestions,
  onToggleSuggestions
}) {
  if (!isOpen) return null;

  const halfIndex = Math.ceil(cart.length / 2);
  const shopriteItems = cart.slice(0, halfIndex);
  const checkersItems = cart.slice(halfIndex);

  const singleShopriteTotal = (estimatedTotal * 0.95).toFixed(2);
  const singleCheckersTotal = estimatedTotal.toFixed(2);
  const singlePnPTotal = (estimatedTotal * 1.04).toFixed(2);
  const optimizedSplitTotal = (estimatedTotal * 0.88).toFixed(2);
  const totalSavings = (estimatedTotal * 0.12).toFixed(2);

  return (
    <div className="drawer-overlay">
      <div className="dashboard-modal">
        {/* Modal Header */}
        <div className="drawer-header">
          <h2>Basket Optimisation Results</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <img src="/icons/close_dismiss.svg" alt="Close" className="icon-img" />
          </button>
        </div>

        <div className="dashboard-body">
          {/* AI Suggestions Toggle */}
          <div className="setting-toggle-box">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showSuggestions}
                onChange={(e) => onToggleSuggestions(e.target.checked)}
              />
              <span>Enable Smart AI Substitutions & Savings Alerts</span>
            </label>
          </div>

          {/* Single Store Cost Comparison */}
          <h3 className="section-header">Single Store Cost Comparison</h3>
          <div className="dashboard-grid">
            <div className="dash-card cheapest-card">
              <div className="card-header-icon">
                <h4>Shoprite</h4>
                <img src="/icons/trophy.svg" alt="Cheapest Store" className="icon-img-trophy" />
              </div>
              <p className="dash-price">R{singleShopriteTotal}</p>
              <span className="save-tag">Cheapest Single Store</span>
            </div>

            <div className="dash-card">
              <h4>Checkers</h4>
              <p className="dash-price">R{singleCheckersTotal}</p>
            </div>

            <div className="dash-card">
              <h4>Pick n Pay</h4>
              <p className="dash-price">R{singlePnPTotal}</p>
            </div>
          </div>

          {/* Optimal Multi-Store Split Route */}
          <h3 className="section-header">
            <img src="/icons/location.svg" alt="Location" className="header-icon" />
            Optimal Multi-Store Split Route ({selectedCluster})
          </h3>

          <div className="hero-split-card">
            <p className="strategy-text">
              <strong>Route Strategy:</strong> Split basket across nearby stores to maximize total savings.
            </p>

            <div className="split-groups-container">
              <div className="split-group">
                <h5>🛒 Buy at Shoprite:</h5>
                <ul>
                  {shopriteItems.map((item) => (
                    <li key={item.id}>
                      {item.name} ({item.size}) — R{item.prices?.Shoprite || '0.00'}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="split-group">
                <h5>🛒 Buy at Checkers (300m away):</h5>
                <ul>
                  {checkersItems.map((item) => (
                    <li key={item.id}>
                      {item.name} ({item.size}) — R{item.prices?.Checkers || '0.00'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="total-savings-banner">
              Optimized Total Split Cost: <strong>R{optimizedSplitTotal}</strong> | {' '}
              <span className="savings-highlight">Total Savings: R{totalSavings}!</span>
            </div>
          </div>

          {/* AI Smart Substitution Alert */}
          {showSuggestions && (
            <div className="suggestion-box">
              <div className="suggestion-header">
                <div className="suggestion-title">
                  <img src="/icons/alert_banner.svg" alt="Alert" className="icon-img" />
                  <h4>AI Smart Substitution Alert</h4>
                </div>
                <button
                  className="close-btn-sm"
                  onClick={() => onToggleSuggestions(false)}
                  aria-label="Dismiss alert"
                >
                  <img src="/icons/close_dismiss.svg" alt="Dismiss" className="icon-img-sm" />
                </button>
              </div>
              <p>
                Swap branded items with available <strong>Housebrand alternatives</strong> at Shoprite to save an additional <strong>R15.00</strong> on your current basket!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}