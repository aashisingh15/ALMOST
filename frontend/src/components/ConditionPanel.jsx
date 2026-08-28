const conditionMeta = [
  { key: "input", label: "INPUT SPACE", icon: "I", color: "pink", detail: "fuzzing values", metric: "1,842 candidates", value: 72 },
  { key: "timing", valueKey: "delay", label: "TIMING WINDOW", icon: "T", color: "cyan", detail: "jitter + delay", metric: "0–1.2s range", value: 58 },
  { key: "order", label: "EXECUTION ORDER", icon: "O", color: "purple", detail: "permutation paths", metric: "6 sequences", value: 81 },
  { key: "load", label: "LOAD / ENV", icon: "L", color: "orange", detail: "pressure profiles", metric: "3 profiles", value: 44 },
];

export default function ConditionPanel({ current, searching, progress }) {
  const activeIndex = searching ? Math.min(3, Math.floor(progress / 25)) : -1;

  return (
    <section className="condition-panel panel panel-grid-bg" aria-labelledby="conditions-title">
      <div className="section-heading">
        <div>
          <span className="kicker">04 / SEARCH SPACE</span>
          <h2 id="conditions-title">Conditions in flight</h2>
        </div>
        <span className="live-pill"><i /> {searching ? "MUTATING" : "READY"}</span>
      </div>

      <div className="condition-list">
        {conditionMeta.map((condition, index) => {
          const value = current[condition.valueKey || condition.key];
          const isActive = searching && activeIndex === index;
          const isLocked = !searching && current;

          return (
            <div className={`condition-card ${condition.color} ${isActive ? "is-active" : ""} ${isLocked ? "is-locked" : ""}`} key={condition.key}>
              <div className="condition-icon">{condition.icon}</div>
              <div className="condition-copy">
                <div className="condition-card-top">
                  <span>{condition.label}</span>
                  <b>{isActive ? "SCANNING" : isLocked ? "LOCKED" : "STAGED"}</b>
                </div>
                <strong>{value}</strong>
                <div className="condition-meta">
                  <span>{condition.detail}</span>
                  <span>{condition.metric}</span>
                </div>
                <div className="condition-meter"><span style={{ width: `${isActive ? Math.max(condition.value, progress % 25 * 4) : condition.value}%` }} /></div>
              </div>
              <span className="condition-chevron">↗</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
