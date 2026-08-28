export default function FailureResult({ current, copied, onCopy }) {
  const recipeRows = [
    ["01", "input", current.input],
    ["02", "delay", current.delay],
    ["03", "order", current.order],
    ["04", "load", current.load],
  ];

  return (
    <section className="result-stack" aria-labelledby="failure-title">
      <div className="failure-banner">
        <div className="failure-signal"><span>!</span></div>
        <div>
          <span className="kicker hot-kicker">INTERMITTENT FAILURE DETECTED</span>
          <h2 id="failure-title">The bug has a shape.</h2>
          <p>{current.error}</p>
        </div>
        <div className="confidence-score"><span>CONFIDENCE</span><strong>97.4%</strong><i><b /></i></div>
      </div>

      <div className="recipe-panel panel panel-grid-bg">
        <div className="recipe-heading">
          <div>
            <span className="kicker">03 / MINIMIZED RESULT</span>
            <h2>Failure Recipe</h2>
            <p>The smallest condition set that reliably reproduces the failure.</p>
          </div>
          <button className={`copy-button ${copied ? "copied" : ""}`} type="button" onClick={onCopy}>
            <span>{copied ? "COPIED" : "COPY RECIPE"}</span><b>{copied ? "✓" : "⌘"}</b>
          </button>
        </div>

        <div className="recipe-code-block">
          <div className="recipe-code-header"><span><i /> REPRODUCIBLE / RECIPE-001</span><span>ALMOST.MIN</span></div>
          <div className="recipe-rows">
            {recipeRows.map(([number, key, value]) => (
              <div className="recipe-row" key={key}><span className="line-number">{number}</span><code><em>{key}</em> <i>=</i> <strong>{value}</strong></code><span className="row-check">✓</span></div>
            ))}
          </div>
          <div className="recipe-footer"><span><i className="footer-dot" /> RECIPE VALIDATED</span><span>reproduces in 3 / 3 runs</span></div>
        </div>
      </div>
    </section>
  );
}
