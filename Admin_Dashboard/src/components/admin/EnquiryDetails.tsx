import type { Enquiry } from "../../services/api";

interface EnquiryDetailsProps {
  enquiry: Enquiry;
  onClose: () => void;
}

function EnquiryDetails({
  enquiry,
  onClose,
}: EnquiryDetailsProps) {
  const getStatusClass = (
    status: Enquiry["status"]
  ) => {
    switch (status) {
      case "New":
        return "text-bg-primary";

      case "Contacted":
        return "text-bg-info";

      case "In Progress":
        return "text-bg-warning";

      case "Closed":
        return "text-bg-success";

      default:
        return "text-bg-secondary";
    }
  };

  const getUserTypeClass = (
    type: Enquiry["user_type"]
  ) => {
    switch (type) {
      case "Student":
        return "text-bg-primary";

      case "Customer":
        return "text-bg-success";

      default:
        return "text-bg-secondary";
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <>
      <style>
        {`
          /* ==============================
             OVERLAY
          ============================== */

          .dronetv-modal-overlay {
            position: fixed;
            inset: 0;
            z-index: 1055;

            background: rgba(15, 23, 42, 0.55);

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 20px;

            backdrop-filter: blur(3px);
          }

          /* ==============================
             MODAL
          ============================== */

          .dronetv-detail-modal {
            width: 100%;
            max-width: 760px;

            max-height: calc(100vh - 40px);

            background: #ffffff;

            border-radius: 12px;

            box-shadow:
              0 20px 50px rgba(0, 0, 0, 0.20);

            overflow: hidden;

            display: flex;
            flex-direction: column;
          }

          /* ==============================
             HEADER
          ============================== */

          .dronetv-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 16px 20px;

            border-bottom: 1px solid #e5e7eb;

            background: #ffffff;
          }

          .dronetv-modal-title-wrapper {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .dronetv-modal-icon {
            width: 38px;
            height: 38px;

            border-radius: 9px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: rgba(13, 110, 253, 0.10);

            color: #0d6efd;

            font-size: 17px;
          }

          .dronetv-modal-title {
            margin: 0;

            font-size: 18px;
            font-weight: 650;

            color: #212529;
          }

          .dronetv-modal-subtitle {
            margin-top: 2px;

            font-size: 11px;

            color: #6c757d;
          }

          .dronetv-modal-close {
            width: 34px;
            height: 34px;

            padding: 0;

            border: 0;

            border-radius: 7px;

            background: transparent;

            color: #6c757d;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 20px;

            transition: all 0.15s ease;
          }

          .dronetv-modal-close:hover {
            background: #f1f3f5;
            color: #212529;
          }

          /* ==============================
             BODY
          ============================== */

          .dronetv-modal-body {
            padding: 20px;

            overflow-y: auto;

            background: #f8f9fa;
          }

          /* ==============================
             INFORMATION GRID
          ============================== */

          .dronetv-info-grid {
            display: grid;

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 12px;

            margin-bottom: 16px;
          }

          .dronetv-info-card {
            background: #ffffff;

            border: 1px solid #e5e7eb;

            border-radius: 8px;

            padding: 13px 14px;

            min-width: 0;
          }

          .dronetv-info-label {
            display: flex;
            align-items: center;
            gap: 6px;

            margin-bottom: 6px;

            font-size: 10px;

            font-weight: 700;

            text-transform: uppercase;

            letter-spacing: 0.4px;

            color: #6c757d;
          }

          .dronetv-info-label i {
            font-size: 11px;

            color: #0d6efd;
          }

          .dronetv-info-value {
            font-size: 14px;

            font-weight: 500;

            color: #212529;

            overflow-wrap: anywhere;
          }

          /* ==============================
             BADGES
          ============================== */

          .dronetv-detail-badge {
            display: inline-flex;
            align-items: center;

            font-size: 10px;

            font-weight: 650;

            padding: 4px 8px;

            border-radius: 5px;
          }

          /* ==============================
             MESSAGE
          ============================== */

          .dronetv-message-section {
            background: #ffffff;

            border: 1px solid #e5e7eb;

            border-radius: 8px;

            overflow: hidden;

            margin-bottom: 16px;
          }

          .dronetv-message-header {
            display: flex;
            align-items: center;
            gap: 7px;

            padding: 11px 14px;

            border-bottom: 1px solid #e5e7eb;

            font-size: 11px;

            font-weight: 700;

            color: #495057;

            text-transform: uppercase;

            letter-spacing: 0.4px;
          }

          .dronetv-message-header i {
            color: #0d6efd;
          }

          .dronetv-message-content {
            padding: 14px;

            font-size: 13px;

            line-height: 1.6;

            color: #343a40;

            white-space: pre-wrap;

            overflow-wrap: anywhere;
          }

          .dronetv-empty-message {
            color: #adb5bd;

            font-style: italic;
          }

          /* ==============================
             CREATED INFO
          ============================== */

          .dronetv-created-info {
            display: flex;
            align-items: center;
            gap: 7px;

            font-size: 11px;

            color: #6c757d;
          }

          .dronetv-created-info i {
            color: #0d6efd;
          }

          /* ==============================
             FOOTER
          ============================== */

          .dronetv-modal-footer {
            display: flex;
            justify-content: flex-end;

            padding: 12px 20px;

            border-top: 1px solid #e5e7eb;

            background: #ffffff;
          }

          .dronetv-close-btn {
            font-size: 12px;

            padding: 7px 16px;

            border-radius: 6px;
          }

          /* ==============================
             RESPONSIVE
          ============================== */

          @media (max-width: 576px) {

            .dronetv-modal-overlay {
              padding: 10px;
            }

            .dronetv-detail-modal {
              max-height: calc(100vh - 20px);

              border-radius: 10px;
            }

            .dronetv-info-grid {
              grid-template-columns: 1fr;
            }

            .dronetv-modal-header {
              padding: 14px 16px;
            }

            .dronetv-modal-body {
              padding: 14px;
            }

            .dronetv-modal-footer {
              padding: 10px 14px;
            }
          }
        `}
      </style>

      {/* =================================
          MODAL OVERLAY
      ================================= */}

      <div
        className="dronetv-modal-overlay"
        onMouseDown={(e) => {
          if (
            e.target === e.currentTarget
          ) {
            onClose();
          }
        }}
      >
        {/* =================================
            MODAL
        ================================= */}

        <div
          className="dronetv-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
        >

          {/* =================================
              HEADER
          ================================= */}

          <div className="dronetv-modal-header">

            <div className="dronetv-modal-title-wrapper">

              <div className="dronetv-modal-icon">
                <i className="bi bi-chat-left-text" />
              </div>

              <div>
                <h5
                  id="enquiry-modal-title"
                  className="dronetv-modal-title"
                >
                  Enquiry #{enquiry.id}
                </h5>

                <div className="dronetv-modal-subtitle">
                  Enquiry details
                </div>
              </div>

            </div>

            <button
              type="button"
              className="dronetv-modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="bi bi-x-lg" />
            </button>

          </div>

          {/* =================================
              BODY
          ================================= */}

          <div className="dronetv-modal-body">

            {/* INFORMATION */}

            <div className="dronetv-info-grid">

              {/* NAME */}

              <div className="dronetv-info-card">

                <div className="dronetv-info-label">
                  <i className="bi bi-person" />
                  Name
                </div>

                <div className="dronetv-info-value">
                  {enquiry.name}
                </div>

              </div>

              {/* USER TYPE */}

              <div className="dronetv-info-card">

                <div className="dronetv-info-label">
                  <i className="bi bi-people" />
                  User Type
                </div>

                <div className="dronetv-info-value">

                  <span
                    className={`dronetv-detail-badge ${getUserTypeClass(
                      enquiry.user_type
                    )}`}
                  >
                    {enquiry.user_type}
                  </span>

                </div>

              </div>

              {/* EMAIL */}

              <div className="dronetv-info-card">

                <div className="dronetv-info-label">
                  <i className="bi bi-envelope" />
                  Email
                </div>

                <div className="dronetv-info-value">
                  {enquiry.email}
                </div>

              </div>

              {/* PHONE */}

              <div className="dronetv-info-card">

                <div className="dronetv-info-label">
                  <i className="bi bi-telephone" />
                  Phone
                </div>

                <div className="dronetv-info-value">
                  {enquiry.phone}
                </div>

              </div>

              {/* SERVICE / COURSE */}

              <div className="dronetv-info-card">

                <div className="dronetv-info-label">
                  <i className="bi bi-mortarboard" />
                  Service / Course
                </div>

                <div className="dronetv-info-value">
                  {enquiry.service_interest ||
                    "—"}
                </div>

              </div>

              {/* STATUS */}

              <div className="dronetv-info-card">

                <div className="dronetv-info-label">
                  <i className="bi bi-circle-half" />
                  Status
                </div>

                <div className="dronetv-info-value">

                  <span
                    className={`dronetv-detail-badge ${getStatusClass(
                      enquiry.status
                    )}`}
                  >
                    {enquiry.status}
                  </span>

                </div>

              </div>

            </div>

            {/* =================================
                MESSAGE
            ================================= */}

            <div className="dronetv-message-section">

              <div className="dronetv-message-header">
                <i className="bi bi-chat-square-text" />
                Message
              </div>

              <div className="dronetv-message-content">

                {enquiry.message ? (
                  enquiry.message
                ) : (
                  <span className="dronetv-empty-message">
                    No message provided.
                  </span>
                )}

              </div>

            </div>

            {/* =================================
                CREATED
            ================================= */}

            <div className="dronetv-created-info">

              <i className="bi bi-clock" />

              Created{" "}
              {formatDate(
                enquiry.created_at
              )}

            </div>

          </div>

          {/* =================================
              FOOTER
          ================================= */}

          

        </div>
      </div>
    </>
  );
}

export default EnquiryDetails;