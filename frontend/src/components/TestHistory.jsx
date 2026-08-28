export default function TestHistory({ history }) {
  return (
    <section className="history-panel panel" aria-labelledby="history-title">
      <div className="section-heading">
        <div>
          <span className="kicker">05 / RUN LOG</span>
          <h2 id="history-title">Test history</h2>
        </div>
        <span className="history-count">{String(history.length).padStart(2, "0")} RUNS</span>
      </div>

      <div className="history-table" role="table" aria-label="Search history">
        <div className="history-row history-head" role="row"><span>RUN</span><span>SCENARIO</span><span>STATUS</span><span>TESTS</span><span>TIME</span></div>
        {history.map((item) => (
          <div className="history-row" role="row" key={item.id}>
            <span className="run-id">{item.id}</span>
            <strong>{item.scenario}</strong>
            <span className={`history-status ${item.status === "FAILURE FOUND" ? "fail" : "pass"}`}><i />{item.status}</span>
            <span className="tests-value">{item.tests.toLocaleString()}</span>
            <span className="history-time">{item.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
