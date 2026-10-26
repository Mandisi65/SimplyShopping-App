export default function SubstitutionAlert({ showSuggestions, onDismiss }) {
  if (!showSuggestions) return null;

  return (
    <div className="suggestion-box">
      <div className="suggestion-header">
        <div className="suggestion-title">
          <img src="/icons/alert_banner.svg" alt="Alert" className="icon-img" />
          <h4>AI Smart Substitution Alert</h4>
        </div>
        <button
          className="close-btn-sm"
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <img src="/icons/close_dismiss.svg" alt="Dismiss" className="icon-img-sm" />
        </button>
      </div>
      <p>
        Swap branded items with available <strong>Housebrand alternatives</strong> at Shoprite to save an additional <strong>R15.00</strong> on your current basket!
      </p>
    </div>
  );
}