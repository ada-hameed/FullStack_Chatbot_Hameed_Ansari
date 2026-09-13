interface AdminNavbarProps {
  onToggleSidebar: () => void;
}

export default function AdminNavbar({
  onToggleSidebar,
}: AdminNavbarProps) {
  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">

        {/* Left */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              type="button"
              className="nav-link border-0 bg-transparent"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <i className="bi bi-list" />
            </button>
          </li>
        </ul>

        {/* Right */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <span className="nav-link dronetv-admin-user">
              <i className="bi bi-person-circle me-1" />
              Admin
            </span>
          </li>
        </ul>

      </div>
    </nav>
  );
}