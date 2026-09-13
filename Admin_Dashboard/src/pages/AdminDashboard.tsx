import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getEnquiries,
  type Enquiry,
} from "../services/api";

function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD DATA
  // ==========================================

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEnquiries();

      setEnquiries(data.enquiries || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalEnquiries = enquiries.length;

  const newEnquiries = enquiries.filter(
    (item) => item.status === "New"
  ).length;

  const inProgressEnquiries = enquiries.filter(
    (item) => item.status === "In Progress"
  ).length;

  const closedEnquiries = enquiries.filter(
    (item) => item.status === "Closed"
  ).length;

  // ==========================================
  // RECENT ENQUIRIES
  // ==========================================

  const recentEnquiries = [...enquiries]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  // ==========================================
  // STATUS
  // ==========================================

  const getStatusClass = (
    status: Enquiry["status"]
  ) => {
    switch (status) {
      case "New":
        return "dronetv-status-new";

      case "Contacted":
        return "dronetv-status-contacted";

      case "In Progress":
        return "dronetv-status-progress";

      case "Closed":
        return "dronetv-status-closed";

      default:
        return "dronetv-status-other";
    }
  };

  // ==========================================
  // USER TYPE
  // ==========================================

  const getUserTypeClass = (
    type: Enquiry["user_type"]
  ) => {
    switch (type) {
      case "Student":
        return "dronetv-user-student";

      case "Customer":
        return "dronetv-user-customer";

      default:
        return "dronetv-user-other";
    }
  };

  // ==========================================
  // DATE
  // ==========================================

  const formatDate = (date: string) => {
    if (!date) return "—";

    const value = new Date(date);

    return (
      <>
        <div className="dronetv-date-main">
          {value.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>

        <div className="dronetv-date-time">
          {value.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </>
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <style>
        {`
          /* =====================================================
             DRONETV DASHBOARD
             Assignment-style black / yellow theme
          ===================================================== */

          .dronetv-dashboard {
            width: 100%;
            color: #222222;
            font-size: 13px;
          }

          /* =====================================================
             PAGE HEADER
          ===================================================== */

          .dronetv-page-header {
            margin-bottom: 18px;
          }

          .dronetv-page-title {
            margin: 0;

            font-size: 24px;
            line-height: 1.2;

            font-weight: 650;

            color: #171717;
          }

          .dronetv-page-subtitle {
            margin: 5px 0 0;

            font-size: 12px;

            color: #6b6b6b;
          }

          .dronetv-breadcrumb {
            padding-top: 4px;

            font-size: 12px;

            color: #666666;
          }

          .dronetv-breadcrumb-current {
            color: #171717;
            font-weight: 600;
          }

          /* =====================================================
             STAT CARDS
          ===================================================== */

          .dronetv-stat-card {
            position: relative;

            min-height: 112px;

            padding: 17px 18px;

            border-radius: 7px;

            overflow: hidden;

            border: 1px solid rgba(0, 0, 0, 0.08);

            box-shadow:
              0 2px 6px rgba(0, 0, 0, 0.10);

            transition:
              transform 0.15s ease,
              box-shadow 0.15s ease;
          }

          .dronetv-stat-card:hover {
            transform: translateY(-2px);

            box-shadow:
              0 5px 12px rgba(0, 0, 0, 0.14);
          }

          .dronetv-stat-number {
            position: relative;
            z-index: 2;

            font-size: 27px;
            line-height: 1;

            font-weight: 700;
          }

          .dronetv-stat-label {
            position: relative;
            z-index: 2;

            margin-top: 9px;

            font-size: 12px;

            font-weight: 600;
          }

          .dronetv-stat-icon {
            position: absolute;

            right: 17px;
            bottom: 10px;

            font-size: 50px;

            opacity: 0.12;
          }

          /* PRIMARY */

          .dronetv-stat-total {
            background: #171717;
            color: #ffffff;

            border-bottom: 3px solid #ffc72c;
          }

          /* NEW */

          .dronetv-stat-new {
            background: #ffffff;
            color: #171717;

            border-top: 3px solid #ffc72c;
          }

          /* IN PROGRESS */

          .dronetv-stat-progress {
            background: #ffc72c;
            color: #171717;

            border-bottom: 3px solid #171717;
          }

          /* CLOSED */

          .dronetv-stat-closed {
            background: #ffffff;
            color: #171717;

            border-top: 3px solid #171717;
          }

          /* =====================================================
             MAIN CARD
          ===================================================== */

          .dronetv-dashboard-card {
            margin-top: 20px;

            background: #ffffff;

            border: 1px solid #dddddd;

            border-radius: 7px;

            overflow: hidden;

            box-shadow:
              0 2px 5px rgba(0, 0, 0, 0.07);
          }

          /* =====================================================
             CARD HEADER
          ===================================================== */

          .dronetv-dashboard-card-header {
            display: flex;

            align-items: center;

            justify-content: space-between;

            padding: 12px 15px;

            background: #171717;

            border-bottom: 3px solid #ffc72c;
          }

          .dronetv-dashboard-card-title {
            display: flex;

            align-items: center;

            gap: 8px;

            margin: 0;

            font-size: 14px;

            font-weight: 650;

            color: #ffffff;
          }

          .dronetv-dashboard-card-title i {
            color: #ffc72c;

            font-size: 14px;
          }

          .dronetv-view-all {
            padding: 5px 10px;

            font-size: 11px;

            font-weight: 600;

            color: #171717;

            background: #ffc72c;

            border: 1px solid #ffc72c;

            border-radius: 5px;

            text-decoration: none;
          }

          .dronetv-view-all:hover {
            background: #ffffff;

            color: #171717;

            border-color: #ffffff;
          }

          /* =====================================================
             TABLE
          ===================================================== */

          .dronetv-recent-table-wrapper {
            width: 100%;

            overflow-x: auto;
          }

          .dronetv-recent-table {
            width: 100%;

            margin: 0;

            table-layout: fixed;

            font-size: 12px;
          }

          .dronetv-recent-table th {
            padding: 8px 10px;

            background: #f4f4f4;

            border-bottom: 1px solid #d8d8d8;

            color: #333333;

            font-size: 10px;

            font-weight: 700;

            text-transform: uppercase;

            letter-spacing: 0.3px;

            white-space: nowrap;
          }

          .dronetv-recent-table td {
            padding: 8px 10px;

            border-bottom: 1px solid #eeeeee;

            color: #333333;

            font-size: 12px;

            vertical-align: middle;
          }

          .dronetv-recent-table tbody tr:last-child td {
            border-bottom: 0;
          }

          .dronetv-recent-table tbody tr:hover {
            background: #fffdf3;
          }

          /* =====================================================
             TABLE CONTENT
          ===================================================== */

          .dronetv-id {
            color: #777777;

            font-size: 11px;

            font-weight: 600;
          }

          .dronetv-name {
            color: #171717;

            font-size: 12px;

            font-weight: 650;

            overflow-wrap: break-word;
          }

          .dronetv-email {
            color: #666666;

            font-size: 11px;

            overflow-wrap: anywhere;

            word-break: break-word;
          }

          .dronetv-interest {
            color: #444444;

            font-size: 11px;

            overflow-wrap: break-word;
          }

          /* =====================================================
             BADGES
          ===================================================== */

          .dronetv-badge {
            display: inline-flex;

            align-items: center;

            justify-content: center;

            padding: 4px 7px;

            border-radius: 4px;

            font-size: 9px;

            line-height: 1;

            font-weight: 700;

            white-space: nowrap;
          }

          /* USER TYPE */

          .dronetv-user-student {
            background: #171717;

            color: #ffc72c;
          }

          .dronetv-user-customer {
            background: #ffc72c;

            color: #171717;
          }

          .dronetv-user-other {
            background: #eeeeee;

            color: #444444;
          }

          /* STATUS */

          .dronetv-status-new {
            background: #ffc72c;

            color: #171717;
          }

          .dronetv-status-contacted {
            background: #eeeeee;

            color: #333333;
          }

          .dronetv-status-progress {
            background: #171717;

            color: #ffc72c;
          }

          .dronetv-status-closed {
            background: #333333;

            color: #ffffff;
          }

          .dronetv-status-other {
            background: #eeeeee;

            color: #444444;
          }

          /* =====================================================
             DATE
          ===================================================== */

          .dronetv-date-main {
            font-size: 11px;

            font-weight: 600;

            color: #333333;

            white-space: nowrap;
          }

          .dronetv-date-time {
            margin-top: 2px;

            font-size: 10px;

            color: #777777;

            white-space: nowrap;
          }

          /* =====================================================
             VIEW BUTTON
          ===================================================== */

          .dronetv-view-btn {
            width: 27px;
            height: 27px;

            padding: 0;

            display: inline-flex;

            align-items: center;

            justify-content: center;

            font-size: 10px;

            color: #171717;

            border-color: #bdbdbd;

            border-radius: 5px;
          }

          .dronetv-view-btn:hover {
            background: #ffc72c;

            border-color: #ffc72c;

            color: #171717;
          }

          /* =====================================================
             EMPTY STATE
          ===================================================== */

          .dronetv-empty {
            padding: 45px 20px;

            text-align: center;

            color: #777777;
          }

          .dronetv-empty i {
            display: block;

            margin-bottom: 9px;

            font-size: 28px;

            color: #b5b5b5;
          }

          .dronetv-empty p {
            margin: 0;

            font-size: 12px;
          }

          /* =====================================================
             LOADING
          ===================================================== */

          .dronetv-loading {
            padding: 45px 20px;

            text-align: center;
          }

          .dronetv-loading p {
            margin: 9px 0 0;

            font-size: 11px;

            color: #777777;
          }

          /* =====================================================
             ERROR
          ===================================================== */

          .dronetv-error {
            font-size: 12px;

            border-radius: 5px;
          }

          /* =====================================================
             MOBILE
          ===================================================== */

          @media (max-width: 767px) {

            .dronetv-page-title {
              font-size: 21px;
            }

            .dronetv-page-subtitle {
              font-size: 11px;
            }

            .dronetv-stat-card {
              min-height: 100px;

              padding: 15px;
            }

            .dronetv-stat-number {
              font-size: 24px;
            }

            .dronetv-stat-label {
              font-size: 11px;
            }

            .dronetv-stat-icon {
              font-size: 43px;
            }

            .dronetv-recent-table {
              min-width: 760px;
            }
          }
        `}
      </style>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="app-main">

        <div className="app-content">

          <div className="container-fluid dronetv-dashboard">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="dronetv-page-header d-flex justify-content-between align-items-start">

              <div>

                <h1 className="dronetv-page-title">
                  Enquiry Dashboard
                </h1>

                <p className="dronetv-page-subtitle">
                  Overview of customer and student enquiries
                </p>

              </div>

              <div className="dronetv-breadcrumb d-none d-md-block">
                Admin
                <span className="mx-2">/</span>
                <span className="dronetv-breadcrumb-current">
                  Dashboard
                </span>
              </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div
                className="alert alert-danger py-2 px-3 dronetv-error mb-3"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle me-2" />

                {error}

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError("")}
                />
              </div>
            )}

            {/* =================================================
                STAT CARDS
            ================================================= */}

            <div className="row g-3">

              {/* TOTAL */}

              <div className="col-12 col-sm-6 col-xl-3">

                <div className="dronetv-stat-card dronetv-stat-total">

                  <div className="dronetv-stat-number">
                    {loading ? "—" : totalEnquiries}
                  </div>

                  <div className="dronetv-stat-label">
                    Total Enquiries
                  </div>

                  <i className="bi bi-inbox dronetv-stat-icon" />

                </div>

              </div>

              {/* NEW */}

              <div className="col-12 col-sm-6 col-xl-3">

                <div className="dronetv-stat-card dronetv-stat-new">

                  <div className="dronetv-stat-number">
                    {loading ? "—" : newEnquiries}
                  </div>

                  <div className="dronetv-stat-label">
                    New Enquiries
                  </div>

                  <i className="bi bi-envelope dronetv-stat-icon" />

                </div>

              </div>

              {/* IN PROGRESS */}

              <div className="col-12 col-sm-6 col-xl-3">

                <div className="dronetv-stat-card dronetv-stat-progress">

                  <div className="dronetv-stat-number">
                    {loading
                      ? "—"
                      : inProgressEnquiries}
                  </div>

                  <div className="dronetv-stat-label">
                    In Progress
                  </div>

                  <i className="bi bi-hourglass-split dronetv-stat-icon" />

                </div>

              </div>

              {/* CLOSED */}

              <div className="col-12 col-sm-6 col-xl-3">

                <div className="dronetv-stat-card dronetv-stat-closed">

                  <div className="dronetv-stat-number">
                    {loading
                      ? "—"
                      : closedEnquiries}
                  </div>

                  <div className="dronetv-stat-label">
                    Closed Enquiries
                  </div>

                  <i className="bi bi-check-circle dronetv-stat-icon" />

                </div>

              </div>

            </div>

            {/* =================================================
                RECENT ENQUIRIES
            ================================================= */}

            <div className="dronetv-dashboard-card">

              {/* CARD HEADER */}

              <div className="dronetv-dashboard-card-header">

                <h3 className="dronetv-dashboard-card-title">
                  <i className="bi bi-chat-left-text" />
                  Recent Enquiries
                </h3>

                <Link
                  to="/enquiries"
                  className="dronetv-view-all"
                >
                  View All
                  <i className="bi bi-arrow-right ms-1" />
                </Link>

              </div>

              {/* CARD BODY */}

              {loading ? (

                <div className="dronetv-loading">

                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Loading...
                    </span>
                  </div>

                  <p>
                    Loading recent enquiries...
                  </p>

                </div>

              ) : recentEnquiries.length === 0 ? (

                <div className="dronetv-empty">

                  <i className="bi bi-inbox" />

                  <p>
                    No enquiries available.
                  </p>

                </div>

              ) : (

                <div className="dronetv-recent-table-wrapper">

                  <table className="table table-hover align-middle dronetv-recent-table">

                    <colgroup>

                      <col style={{ width: "6%" }} />

                      <col style={{ width: "17%" }} />

                      <col style={{ width: "23%" }} />

                      <col style={{ width: "12%" }} />

                      <col style={{ width: "16%" }} />

                      <col style={{ width: "16%" }} />

                      <col style={{ width: "10%" }} />

                    </colgroup>

                    <thead>

                      <tr>

                        <th className="text-center">
                          ID
                        </th>

                        <th>
                          Name
                        </th>

                        <th>
                          Email
                        </th>

                        <th className="text-center">
                          User Type
                        </th>

                        <th>
                          Interest
                        </th>

                        <th>
                          Status
                        </th>

                        <th className="text-center">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {recentEnquiries.map(
                        (enquiry) => (
                          <tr key={enquiry.id}>

                            {/* ID */}

                            <td className="text-center">

                              <span className="dronetv-id">
                                #{enquiry.id}
                              </span>

                            </td>

                            {/* NAME */}

                            <td>

                              <div className="dronetv-name">
                                {enquiry.name}
                              </div>

                            </td>

                            {/* EMAIL */}

                            <td>

                              <div className="dronetv-email">
                                {enquiry.email}
                              </div>

                            </td>

                            {/* USER TYPE */}

                            <td className="text-center">

                              <span
                                className={`dronetv-badge ${getUserTypeClass(
                                  enquiry.user_type
                                )}`}
                              >
                                {enquiry.user_type}
                              </span>

                            </td>

                            {/* INTEREST */}

                            <td>

                              <span className="dronetv-interest">
                                {enquiry.service_interest ||
                                  "—"}
                              </span>

                            </td>

                            {/* STATUS */}

                            <td>

                              <span
                                className={`dronetv-badge ${getStatusClass(
                                  enquiry.status
                                )}`}
                              >
                                {enquiry.status}
                              </span>

                            </td>

                            {/* ACTION */}

                            <td className="text-center">

                              <Link
                                to="/enquiries"
                                className="btn btn-outline-secondary dronetv-view-btn"
                                title="View Enquiries"
                              >
                                <i className="bi bi-eye" />
                              </Link>

                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </div>

      </main>
    </>
  );
}

export default AdminDashboard;