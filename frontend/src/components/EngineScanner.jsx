export default function EngineScanner({ current, progress, searching, found }) {
  return (
    <div className={`engine-scanner ${searching ? "scanning" : ""} ${found ? "found" : ""}`} aria-label="ALMOST search engine visualization">
      <div className="scanner-grid" />
      <div className="scanner-noise" />
      <div className="scanner-crosshair crosshair-x" />
      <div className="scanner-crosshair crosshair-y" />

      <div className="ring ring-one" />
      <div className="ring ring-two" />
      <div className="ring ring-three" />
      <div className="ring ring-four" />

      <div className="orbit orbit-one"><div className="orbit-dot cyan" /></div>
      <div className="orbit orbit-two"><div className="orbit-dot pink" /></div>
      <div className="orbit orbit-three"><div className="orbit-dot orange" /></div>

      <div className="beam beam-one" />
      <div className="beam beam-two" />
      <div className="beam beam-three" />
      <div className="beam beam-four" />

      <div className="condition-node node-input"><div className="node-icon pink">I</div><span>INPUT</span><strong>{current.input}</strong></div>
      <div className="condition-node node-timing"><div className="node-icon cyan">T</div><span>TIMING</span><strong>{current.delay}</strong></div>
      <div className="condition-node node-order"><div className="node-icon purple">O</div><span>ORDER</span><strong>{current.order}</strong></div>
      <div className="condition-node node-load"><div className="node-icon orange">L</div><span>LOAD</span><strong>{current.load}</strong></div>

      <div className="engine-core">
        <div className="core-aurora" />
        <div className="core-inner"><span>{found ? "!" : searching ? "⌁" : "A"}</span></div>
        <small>{found ? "FAILURE FOUND" : searching ? "SEARCHING" : "ALMOST ENGINE"}</small>
        <div className="core-progress"><div style={{ width: `${progress}%` }} /></div>
        <em>{String(progress).padStart(2, "0")} %</em>
      </div>

      <div className="floating-data data-one">entropy <b>{searching ? "0.81" : "0.72"}</b></div>
      <div className="floating-data data-two">combinations <b>{searching ? `${(12840 + progress * 121).toLocaleString()}` : "12,840"}</b></div>
      <div className="floating-data data-three">confidence <b>{found ? "97.4%" : "—"}</b></div>
      <div className="scan-line" />
      <div className="scanner-caption"><span /><b>{found ? "SIGNATURE LOCKED" : searching ? "PROBING VARIABLE SPACE" : "AWAITING COMMAND"}</b><span /></div>
    </div>
  );
}
