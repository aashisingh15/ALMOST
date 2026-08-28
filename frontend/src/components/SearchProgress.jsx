const phases = [
  { key: "input", label: "INPUT", color: "pink", copy: "Fuzzing edge values" },
  { key: "timing", label: "TIMING", color: "cyan", copy: "Injecting jitter windows" },
  { key: "order", label: "ORDER", color: "purple", copy: "Permuting call paths" },
  { key: "load", label: "LOAD", color: "orange", copy: "Applying pressure profiles" },
];

export default function SearchProgress({ progress, searching, found, onStart }) {
  const activePhase = searching ? Math.min(3, Math.floor(progress / 25)) : found ? 3 : -1;

  return (
    <section className="progress-panel panel" aria-labelledby="progress-title">
      <div className="section-heading">
        <div>
          <span className="kicker">01 / EXPLORATION LOOP</span>
          <h2 id="progress-title">Search progress</h2>
        </div>
        <div className={`run-state ${searching ? "searching" : found ? "found" : "idle"}`}>
          <span /> {searching ? "RUNNING" : found ? "COMPLETE" : "STANDBY"}
        </div>
      </div>

      <div className="progress-readout">
        <div className="progress-value">{String(progress).padStart(2, "0")}<span>%</span></div>
        <div className="progress-copy">
          <strong>{searching ? "Searching the almost-space" : found ? "Failure signature isolated" : "Ready to search the almost-space"}</strong>
          <span>{searching ? "The engine is mutating one variable at a time." : found ? "The smallest reproducible condition set is ready." : "Start a mock run to watch ALMOST converge."}</span>
        </div>
        <button className="primary-button" type="button" onClick={onStart} disabled={searching}>
          <span className="button-pulse" />
          {searching ? "SEARCHING" : found ? "RUN AGAIN" : "START SEARCH"}
          <b>↗</b>
        </button>
      </div>

      <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>

      <div className="phase-grid">
        {phases.map((phase, index) => {
          const isComplete = progress >= (index + 1) * 25;
          const isActive = activePhase === index;
          return (
            <div className={`phase ${phase.color} ${isActive ? "is-active" : ""} ${isComplete ? "is-complete" : ""}`} key={phase.key}>
              <div className="phase-top"><span className="phase-number">0{index + 1}</span><span className="phase-status">{isComplete ? "DONE" : isActive ? "LIVE" : "WAIT"}</span></div>
              <strong>{phase.label}</strong>
              <span>{phase.copy}</span>
              <div className="phase-line"><i style={{ width: `${isComplete ? 100 : isActive ? Math.max(12, (progress % 25) * 4) : 6}%` }} /></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
