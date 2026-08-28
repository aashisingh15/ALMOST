import { useEffect, useState } from "react";
import { TextEffect } from "./components/motion-primitives/text-effect";

import DashboardHeader from "./components/DashboardHeader";
import ConditionPanel from "./components/ConditionPanel";
import EngineScanner from "./components/EngineScanner";
import FailureResult from "./components/FailureResult";
import SearchProgress from "./components/SearchProgress";
import TestHistory from "./components/TestHistory";

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

const initialHistory = [
  {
    id: "#042",
    scenario: "Race Condition",
    status: "FAILURE FOUND",
    tests: 2481,
    time: "2m ago",
  },
  {
    id: "#041",
    scenario: "Network Timing Bug",
    status: "NO FAILURE",
    tests: 1942,
    time: "8m ago",
  },
  {
    id: "#040",
    scenario: "Rare Input Bug",
    status: "FAILURE FOUND",
    tests: 4821,
    time: "17m ago",
  },
  {
    id: "#039",
    scenario: "Cache Invalidation",
    status: "NO FAILURE",
    tests: 3168,
    time: "31m ago",
  },
];

function App() {
  const [scenario, setScenario] = useState("race");
  const [progress, setProgress] = useState(0);
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);
  const [tests, setTests] = useState(2481);
  const [failures, setFailures] = useState(1);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState(initialHistory);

  const current = scenarios[scenario];

  const visibleTests = searching
    ? Math.floor(progress * 18)
    : tests;

  const visibleFailures = searching
    ? progress >= 82
      ? 1
      : 0
    : failures;

  const statusLabel = searching
    ? "SEARCHING"
    : found
    ? "FAILURE FOUND"
    : "READY";

  const searchPhase = searching
    ? [
        "Input mutation",
        "Timing jitter",
        "Order permutation",
        "Load pressure",
      ][Math.min(3, Math.floor(progress / 25))]
    : found
    ? "Recipe minimized"
    : "No active run";

  const startSearch = () => {
    setSearching(true);
    setFound(false);
    setProgress(0);
    setTests(0);
    setFailures(0);
    setCopied(false);
  };

  useEffect(() => {
    if (!searching) return undefined;

    const interval = window.setInterval(() => {
      setProgress((previous) =>
        Math.min(previous + 2, 100)
      );
    }, 65);

    return () => window.clearInterval(interval);
  }, [searching]);

  useEffect(() => {
    if (!searching || progress < 100) return undefined;

    const completion = window.setTimeout(() => {
      setSearching(false);
      setFound(true);
      setFailures(1);
      setTests(1800);

      setHistory((previous) => [
        {
          id: "#043",
          scenario: current.name,
          status: "FAILURE FOUND",
          tests: 1800,
          time: "just now",
        },
        ...previous,
      ].slice(0, 5));
    }, 0);

    return () => window.clearTimeout(completion);
  }, [progress, searching, current]);

  const changeScenario = (event) => {
    setScenario(event.target.value);
    setSearching(false);
    setFound(false);
    setProgress(0);
    setTests(0);
    setFailures(0);
    setCopied(false);
  };

  const copyRecipe = async () => {
    const recipe = `ALMOST Failure Recipe

Input: ${current.input}
Delay: ${current.delay}
Execution Order: ${current.order}
Load: ${current.load}`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(recipe);
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="app-shell">

      <div className="ambient-grid" />
      <div className="ambient-orb orb-purple" />
      <div className="ambient-orb orb-cyan" />
      <div className="ambient-orb orb-pink" />
      <div className="scanlines" />

      <DashboardHeader
        searching={searching}
        found={found}
        projectStatus="PROJECT ONLINE"
      />

      <main className="dashboard-shell">

        {/* ================= HERO ================= */}

        <section className="hero-section">

          <div className="hero-copy">

            <div className="eyebrow">
              <span>ALMOST / 001</span>
              <i />
              INTELLIGENT FAILURE SEARCH
              <b>LIVE ENGINE</b>
            </div>

            <TextEffect
              as="h1"
              preset="fade-in-blur"
              per="word"
              className="hero-title"
            >
              Find the conditions behind almost bugs.
            </TextEffect>

            <p>
              Probe the space between pass and fail. ALMOST
              mutates input, timing, execution order, and load
              until an intermittent failure leaves a
              reproducible trace.
            </p>

          </div>

          <div className="hero-aside">

            <span className="aside-label">
              ACTIVE TARGET
            </span>

            <strong>
              {current.name}
            </strong>

            <span className="aside-rule" />

            <span className="aside-meta">
              target_app / mock mode
            </span>

          </div>

        </section>

        {/* ================= METRICS ================= */}

        <section
          className="metric-strip"
          aria-label="Project metrics"
        >

          <div className="metric-card">

            <span>
              PROJECT STATUS
            </span>

            <strong className="metric-online">
              <i />
              OPERATIONAL
            </strong>

            <small>
              target_app connected
            </small>

          </div>

          <div className="metric-card">

            <span>
              TESTS RUN
            </span>

            <strong>
              {visibleTests.toLocaleString()}
            </strong>

            <small>
              <b className="metric-up">
                ↑ 18.6%
              </b>{" "}
              this session
            </small>

          </div>

          <div className="metric-card">

            <span>
              FAILURES FOUND
            </span>

            <strong className="metric-hot">
              {visibleFailures}
            </strong>

            <small>
              {found
                ? "recipe available"
                : "awaiting signal"}
            </small>

          </div>

          <div className="metric-card">

            <span>
              SEARCH STATUS
            </span>

            <strong
              className={
                searching
                  ? "metric-searching"
                  : found
                  ? "metric-hot"
                  : ""
              }
            >
              {statusLabel}
            </strong>

            <small>
              {searchPhase}
            </small>

          </div>

        </section>

        {/* ================= WORKSPACE ================= */}

        <section className="workspace-grid">

          <div className="workspace-main">

            <SearchProgress
              progress={progress}
              searching={searching}
              found={found}
              onStart={startSearch}
            />

            <div className="engine-stage panel">

              <div className="stage-heading">

                <div>

                  <span className="kicker">
                    02 / SIGNAL MAP
                  </span>

                  <h2>
                    ALMOST engine
                  </h2>

                </div>

                <div className="stage-meta">

                  <span className="pulse-ring" />

                  4 variables / 1 target

                </div>

              </div>

              <EngineScanner
                current={current}
                progress={progress}
                searching={searching}
                found={found}
              />

            </div>

          </div>

          {/* ================= CONTROL RAIL ================= */}

          <aside className="control-rail">

            <section className="control-panel panel">

              <div className="section-heading">

                <div>

                  <span className="kicker">
                    CONFIG / 000
                  </span>

                  <h2>
                    Search target
                  </h2>

                </div>

                <span className="panel-symbol">
                  ◆
                </span>

              </div>

              <label htmlFor="scenario">
                TARGET SCENARIO
              </label>

              <select
                id="scenario"
                value={scenario}
                onChange={changeScenario}
              >

                <option value="race">
                  Race Condition
                </option>

                <option value="network">
                  Network Timing Bug
                </option>

                <option value="rare">
                  Rare Input Bug
                </option>

              </select>

              <label>
                SEARCH INTENSITY
              </label>

              <div
                className="intensity"
                role="group"
                aria-label="Search intensity"
              >

                <button type="button">
                  QUICK
                </button>

                <button
                  className="active"
                  type="button"
                >
                  DEEP
                </button>

                <button type="button">
                  BRUTE
                </button>

              </div>

              <div className="target-summary">

                <span>
                  SCANNING FOR
                </span>

                <strong>
                  {current.error}
                </strong>

              </div>

              <div className="rail-foot">

                <span>
                  MOCK DATASET
                </span>

                <b>
                  v0.8.4
                </b>

              </div>

            </section>

            {/* ================= LIVE CONSOLE ================= */}

            <div className="rail-console panel">

              <div className="console-header">

                <span>
                  <i />
                  LIVE CONSOLE
                </span>

                <b>
                  ● REC
                </b>

              </div>

              <div className="console-line">

                <span>
                  00:04:12
                </span>

                engine.boot({"{"} target_app {"}"})

              </div>

              <div className="console-line">

                <span>
                  00:04:13
                </span>

                search.space.open()

              </div>

              <div
                className={`console-line ${
                  searching
                    ? "console-active"
                    : ""
                }`}
              >

                <span>
                  00:04:14
                </span>

                {searching
                  ? "mutate.next()"
                  : found
                  ? "recipe.minimize()"
                  : "await start()"}

                <i>_</i>

              </div>

            </div>

          </aside>

        </section>

        {/* ================= CONDITION PANEL ================= */}

        <ConditionPanel
          current={current}
          searching={searching}
          progress={progress}
        />

        {/* ================= FAILURE RESULT ================= */}

        {found && (
          <FailureResult
            current={current}
            copied={copied}
            onCopy={copyRecipe}
          />
        )}

        {/* ================= HISTORY ================= */}

        <TestHistory
          history={history}
        />

        {/* ================= FOOTER ================= */}

        <footer className="dashboard-footer">

          <span>
            ALMOST // DISCOVER WHAT ONLY HAPPENS SOMETIMES
          </span>

          <span>
            BUILD 1.0.0
            <i />
            FRONTEND MOCK
          </span>

        </footer>

      </main>

    </div>
  );
}

export default App;