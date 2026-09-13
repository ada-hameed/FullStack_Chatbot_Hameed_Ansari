// @ts-nocheck
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const isDashboard = location.pathname === "/";
  const isEnquiries = location.pathname === "/enquiries";

  return (
    <aside
      className="app-sidebar shadow"
      data-bs-theme="dark"
    >
      {/* =========================================
          BRAND
      ========================================= */}

      <div className="sidebar-brand">

        <Link to="/" className="brand-link">
          <img
            src="/assets/img/dronLogo2.png"
            alt="DroneTV"
            className="dronetv-logo"
          />
        </Link>

      </div>

      {/* =========================================
          SIDEBAR MENU
      ========================================= */}

      <div className="sidebar-wrapper">

        <nav className="mt-2">

          <ul
            className="nav sidebar-menu flex-column"
            data-lte-toggle="treeview"
            role="menu"
          >

            {/* Section */}

            <li className="nav-header">
              ENQUIRY MANAGEMENT
            </li>

            {/* =====================================
                DASHBOARD
            ===================================== */}

            <li className="nav-item">

              <Link
                to="/"
                className={`nav-link ${isDashboard ? "active" : ""
                  }`}
              >

                <i className="nav-icon bi bi-speedometer2" />

                <p>
                  Dashboard
                </p>

              </Link>

            </li>

            {/* =====================================
                ENQUIRIES
            ===================================== */}

            <li className="nav-item">

              <Link
                to="/enquiries"
                className={`nav-link ${isEnquiries ? "active" : ""
                  }`}
              >

                <i className="nav-icon bi bi-chat-left-text" />

                <p>
                  Enquiries
                </p>

              </Link>

            </li>

          </ul>

        </nav>

      </div>

    </aside>
  );
}