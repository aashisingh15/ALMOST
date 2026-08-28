import { useEffect, useState } from "react";
import "./App.css";

const scenarios = {
  race: {
    name: "Race Condition",
    input: "42",
    delay: "173ms",
    order: "A → C → B",
    load: "HIGH",
    error: "State mismatch detected during concurrent execution",
  },

  network: {
    name: "Network Timing Bug",
    input: "request_17",
    delay: "842ms",
    order: "A → B → C",
    load: "MEDIUM",
    error: "Timeout race triggered under delayed response",
  },

  rare: {
    name: "Rare Input Bug",
    input: "0xDEAD",
    delay: "211ms",
    order: "C → A → B",
    load: "LOW",
    error: "Unexpected parser state for rare input",
  },
};

function App() {
  const [scenario, setScenario] = useState("race");
  const [progress, setProgress] = useState(0);
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);
  const [tests, setTests] = useState(0);
  const [failures, setFailures] = useState(0);

  const current = scenarios[scenario];

  const startSearch = () => {
    setSearching(true);
    setFound(false);
    setProgress(0);
    setTests(0);
    setFailures(0);
  };

  useEffect(() => {
    if (!searching) return;

    const interval = setInterval(() => {
      setProgress((previousProgress) => {
        const nextProgress = previousProgress + 2;

        setTests(Math.floor(nextProgress * 18));

        if (nextProgress > 78) {
          setFailures(1);
        }

        if (nextProgress >= 100) {
          clearInterval(interval);

          setSearching(false);
          setFound(true);

          return 100;
        }

        return nextProgress;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [searching]);

  const copyRecipe = async () => {
    const recipe = `ALMOST Failure Recipe

Input: ${current.input}
Delay: ${current.delay}
Execution Order: ${current.order}
Load: ${current.load}`;

    try {
      await navigator.clipboard.writeText(recipe);
      alert("Failure recipe copied!");
    } catch {
      alert("Could not copy recipe.");
    }
  };

  return (
    <div className="app">
      {/* BACKGROUND */}

      <div className="grid-background" />

      <div className="orb orb-purple" />
      <div className="orb orb-cyan" />
      <div className="orb orb-pink" />

      {/* ================= HEADER ================= */}

      <header className="header">
        <div className="brand">
          <div className="brand-mark">
            <span />
            <span />
            <span />
          </div>

          <div>
            <div className="brand-name">ALMOST</div>

            <div className="brand-subtitle">
              INTERMITTENT BUG DISCOVERY ENGINE
            </div>
          </div>
        </div>

        <div className="system-status">
          <span className="status-dot" />
          SYSTEM ONLINE
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}

        <section className="hero">
          <div className="eyebrow">
            <span>01</span>

            INTELLIGENT FAILURE SEARCH

            <span>// LIVE ENGINE</span>
          </div>

          <h1>
            Find the conditions
            <br />
            behind <span>almost</span> bugs.
          </h1>

          <p>
            ALMOST explores input, timing, execution order and environment
            combinations to uncover failures ordinary tests miss.
          </p>
        </section>

        {/* ================= MAIN ENGINE ================= */}

        <section className="engine">

          {/* ---------- LEFT CONTROL PANEL ---------- */}

          <div className="control-panel panel">
            <div className="panel-title">
              <span>◆</span>
              SEARCH CONFIGURATION
            </div>

            <label>TARGET SCENARIO</label>

            <select
              value={scenario}
              onChange={(event) => {
                setScenario(event.target.value);
                setFound(false);
                setProgress(0);
              }}
            >
              <option value="race">Race Condition</option>
              <option value="network">Network Timing Bug</option>
              <option value="rare">Rare Input Bug</option>
            </select>

            <label>SEARCH INTENSITY</label>

            <div className="intensity">
              <button type="button">QUICK</button>

              <button
                type="button"
                className="active"
              >
                DEEP
              </button>

              <button type="button">BRUTE</button>
            </div>

            <button
              className="launch"
              onClick={startSearch}
              disabled={searching}
              type="button"
            >
              <span>
                {searching ? "SEARCHING..." : "START SEARCH"}
              </span>

              <b>↗</b>
            </button>

            <div className="mini-stats">
              <div>
                <span>TESTS</span>

                <strong>
                  {tests.toLocaleString()}
                </strong>
              </div>

              <div>
                <span>FAILURES</span>

                <strong className="red">
                  {failures}
                </strong>
              </div>
            </div>
          </div>

          {/* ================= CRAZY CENTER SCANNER ================= */}

          <div
            className={`scanner ${
              searching ? "scanning" : ""
            } ${found ? "found" : ""}`}
          >
            <div className="scanner-grid" />

            {/* ROTATING RINGS */}

            <div className="ring ring-one" />

            <div className="ring ring-two" />

            <div className="ring ring-three" />

            {/* ORBITS */}

            <div className="orbit orbit-one">
              <div className="orbit-dot cyan" />
            </div>

            <div className="orbit orbit-two">
              <div className="orbit-dot pink" />
            </div>

            <div className="orbit orbit-three">
              <div className="orbit-dot orange" />
            </div>

            {/* ENERGY BEAMS */}

            <div className="beam beam-one" />
            <div className="beam beam-two" />
            <div className="beam beam-three" />
            <div className="beam beam-four" />

            {/* ---------- INPUT NODE ---------- */}

            <div className="condition-node node-input">
              <div className="node-icon pink">
                I
              </div>

              <span>INPUT</span>

              <strong>
                {current.input}
              </strong>
            </div>

            {/* ---------- TIMING NODE ---------- */}

            <div className="condition-node node-timing">
              <div className="node-icon cyan">
                T
              </div>

              <span>TIMING</span>

              <strong>
                {current.delay}
              </strong>
            </div>

            {/* ---------- ORDER NODE ---------- */}

            <div className="condition-node node-order">
              <div className="node-icon purple">
                O
              </div>

              <span>ORDER</span>

              <strong>
                {current.order}
              </strong>
            </div>

            {/* ---------- LOAD NODE ---------- */}

            <div className="condition-node node-load">
              <div className="node-icon orange">
                L
              </div>

              <span>LOAD</span>

              <strong>
                {current.load}
              </strong>
            </div>

            {/* ================= ALMOST CORE ================= */}

            <div className="engine-core">
              <div className="core-glow" />

              <div className="core-inner">
                <span>
                  {found
                    ? "!"
                    : searching
                    ? "⌁"
                    : "A"}
                </span>
              </div>

              <small>
                {found
                  ? "FAILURE FOUND"
                  : searching
                  ? "SEARCHING"
                  : "ALMOST ENGINE"}
              </small>

              <div className="core-progress">
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <em>
                {progress}%
              </em>
            </div>

            {/* FLOATING TECH DATA */}

            <div className="floating-data data-one">
              entropy <b>0.72</b>
            </div>

            <div className="floating-data data-two">
              combinations <b>12,840</b>
            </div>

            <div className="floating-data data-three">
              confidence{" "}
              <b>
                {found ? "97.4%" : "—"}
              </b>
            </div>

            {/* SCANNING LASER */}

            <div className="scan-line" />
          </div>

          {/* ================= RIGHT LIVE PANEL ================= */}

          <div className="live-panel panel">
            <div className="panel-title">
              <span>◉</span>
              LIVE EXPLORATION
            </div>

            <div className="live-title">
              CONDITION

              <strong>
                {searching
                  ? "EXPLORING"
                  : found
                  ? "LOCKED"
                  : "IDLE"}
              </strong>
            </div>

            <div className="live-condition">

              <div className="live-row pink-row">
                <span>INPUT</span>

                <code>
                  {current.input}
                </code>
              </div>

              <div className="live-row cyan-row">
                <span>DELAY</span>

                <code>
                  {current.delay}
                </code>
              </div>

              <div className="live-row purple-row">
                <span>ORDER</span>

                <code>
                  {current.order}
                </code>
              </div>

              <div className="live-row orange-row">
                <span>LOAD</span>

                <code>
                  {current.load}
                </code>
              </div>

            </div>

            <div className="activity">

              <div>
                <i />
                sampling input space
              </div>

              <div>
                <i />
                varying network delay
              </div>

              <div>
                <i />
                mutating execution order
              </div>

              <div>
                <i />
                probing load conditions
              </div>

            </div>
          </div>
        </section>

        {/* ================= FAILURE RESULT ================= */}

        {found && (
          <section className="failure-result">

            <div className="failure-glow" />

            <div className="failure-label">
              <span>!</span>

              INTERMITTENT FAILURE DETECTED
            </div>

            <h2>
              Failure Found
            </h2>

            <p>
              {current.error}
            </p>

            <div className="failure-values">

              <div>
                <small>INPUT</small>

                <strong>
                  {current.input}
                </strong>
              </div>

              <div>
                <small>NETWORK DELAY</small>

                <strong>
                  {current.delay}
                </strong>
              </div>

              <div>
                <small>EXECUTION ORDER</small>

                <strong>
                  {current.order}
                </strong>
              </div>

              <div>
                <small>LOAD</small>

                <strong>
                  {current.load}
                </strong>
              </div>

            </div>
          </section>
        )}

        {/* ================= FAILURE RECIPE ================= */}

        {found && (
          <section className="recipe panel">

            <div className="recipe-top">

              <div>
                <span>
                  02 / MINIMIZED RESULT
                </span>

                <h2>
                  Minimal Failure Recipe
                </h2>
              </div>

              <button
                type="button"
                onClick={copyRecipe}
              >
                COPY RECIPE
              </button>

            </div>

            <div className="recipe-code">

              <span>01</span>

              <code>
                input ={" "}
                <b>
                  {current.input}
                </b>
              </code>

              <span>02</span>

              <code>
                delay ={" "}
                <b>
                  {current.delay}
                </b>
              </code>

              <span>03</span>

              <code>
                order ={" "}
                <b>
                  {current.order}
                </b>
              </code>

              <span>04</span>

              <code>
                load ={" "}
                <b>
                  {current.load}
                </b>
              </code>

            </div>
          </section>
        )}

        {/* ================= SEARCH HISTORY ================= */}

        <section className="history panel">

          <div className="panel-title">
            <span>▤</span>
            SEARCH HISTORY
          </div>

          <div className="history-row history-head">
            <span>SCENARIO</span>
            <span>STATUS</span>
            <span>TESTS</span>
            <span>TIME</span>
          </div>

          <div className="history-row">

            <span>
              Race Condition
            </span>

            <b className="history-fail">
              FAILURE FOUND
            </b>

            <span>
              2,481
            </span>

            <span>
              2m ago
            </span>

          </div>

          <div className="history-row">

            <span>
              Network Timing Bug
            </span>

            <b className="history-pass">
              NO FAILURE
            </b>

            <span>
              1,942
            </span>

            <span>
              8m ago
            </span>

          </div>

          <div className="history-row">

            <span>
              Rare Input Bug
            </span>

            <b className="history-fail">
              FAILURE FOUND
            </b>

            <span>
              4,821
            </span>

            <span>
              17m ago
            </span>

          </div>

        </section>
      </main>
    </div>
  );
}

export default App;