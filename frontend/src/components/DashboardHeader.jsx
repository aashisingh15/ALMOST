const navItems = ["Overview", "Search runs", "Recipes"];

export default function DashboardHeader({ searching, found, projectStatus }) {
  const engineLabel = searching ? "SEARCH ENGINE ACTIVE" : found ? "FAILURE RECIPE READY" : "ENGINE STANDBY";

  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <div className="brand-name">ALMOST</div>
          <div className="brand-subtitle">INTERMITTENT BUG DISCOVERY ENGINE</div>
        </div>
      </div>

      <nav className="topnav" aria-label="Dashboard sections">
        {navItems.map((item, index) => (
          <button className={index === 0 ? "topnav-item active" : "topnav-item"} key={item} type="button">
            <span className="nav-index">0{index + 1}</span>
            {item}
          </button>
        ))}
      </nav>

      <div className="header-statuses">
        <div className="header-status">
          <span className="status-dot online" />
          <span>{projectStatus}</span>
        </div>
        <div className={`header-status engine-status ${searching ? "is-searching" : ""} ${found ? "is-found" : ""}`}>
          <span className="status-dot signal" />
          <span>{engineLabel}</span>
        </div>
      </div>
    </header>
  );
}
