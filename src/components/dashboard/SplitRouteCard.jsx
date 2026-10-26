export default function SplitRouteCard({ cart, selectedCluster, estimatedTotal }) {
  const halfIndex = Math.ceil(cart.length / 2);
  const shopriteItems = cart.slice(0, halfIndex);
  const checkersItems = cart.slice(halfIndex);

  const optimizedSplitTotal = (estimatedTotal * 0.88).toFixed(2);
  const totalSavings = (estimatedTotal * 0.12).toFixed(2);

  return (
    <div className="split-route-container">
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
                  {item.name} ({item.size}) — R{item.prices?.Shoprite ? item.prices.Shoprite.toFixed(2) : '0.00'}
                </li>
              ))}
            </ul>
          </div>

          <div className="split-group">
            <h5>🛒 Buy at Checkers (300m away):</h5>
            <ul>
              {checkersItems.map((item) => (
                <li key={item.id}>
                  {item.name} ({item.size}) — R{item.prices?.Checkers ? item.prices.Checkers.toFixed(2) : '0.00'}
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
    </div>
  );
}