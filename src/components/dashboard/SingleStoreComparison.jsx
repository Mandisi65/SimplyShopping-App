export default function SingleStoreComparison({ estimatedTotal }) {
  const singleShopriteTotal = (estimatedTotal * 0.95).toFixed(2);
  const singleCheckersTotal = estimatedTotal.toFixed(2);
  const singlePnPTotal = (estimatedTotal * 1.04).toFixed(2);

  return (
    <div className="single-store-comparison">
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
    </div>
  );
}