import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  deleteEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  type Enquiry,
} from "../services/api";

import EnquiryTable from "../components/admin/EnquiryTable";
import EnquiryDetails from "../components/admin/EnquiryDetails";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState<Enquiry | null>(null);

  // Load enquiries from backend
  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getEnquiries();
      setEnquiries(data.enquiries);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load enquiries."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  // View enquiry details
  const handleView = async (id: number) => {
    setError("");

    try {
      const data = await getEnquiryById(id);
      setSelectedEnquiry(data.enquiry);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load enquiry."
      );
    }
  };

  // Change enquiry status
  const handleStatusChange = async (
    id: number,
    status: Enquiry["status"]
  ) => {
    setActionLoading(true);
    setError("");

    try {
      const data = await updateEnquiryStatus(id, status);

      setEnquiries((current) =>
        current.map((item) =>
          item.id === id ? data.enquiry : item
        )
      );

      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(data.enquiry);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update status."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Delete enquiry
const handleDelete = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Enquiry?",
    text: "This enquiry will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    setActionLoading(true);

    await deleteEnquiry(id);

    await loadEnquiries();

    await Swal.fire({
      title: "Deleted!",
      text: "The enquiry has been deleted successfully.",
      icon: "success",
      confirmButtonText: "OK",
      timer: 1800,
      timerProgressBar: true,
    });
  } catch (error) {
    await Swal.fire({
      title: "Delete Failed",
      text:
        error instanceof Error
          ? error.message
          : "Unable to delete the enquiry.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } finally {
    setActionLoading(false);
  }
};

  return (
    <main className="app-main">

      {/* Page Header */}
      <div className="app-content-header">
        <div className="container-fluid">
          <div className="row">

            <div className="col-sm-6">
              <h3 className="mb-0">
                Enquiries
              </h3>

              <p className="text-muted mb-0">
                Manage customer and student enquiries
              </p>
            </div>

            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-end">

                <li className="breadcrumb-item">
                  Admin
                </li>

                <li className="breadcrumb-item active">
                  Enquiries
                </li>

              </ol>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="app-content">
        <div className="container-fluid">

          {/* Error Message */}
          {error && (
            <div
              className="alert alert-danger alert-dismissible"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle me-2" />

              {error}

              <button
                type="button"
                className="btn-close"
                onClick={() => setError("")}
                aria-label="Close"
              />
            </div>
          )}

          {/* Enquiry Table */}
          <div className="card">

            {/* Card Header */}
            <div className="card-header">

              <h3 className="card-title">
                <i className="bi bi-table me-2" />
                All Enquiries
              </h3>

              <div className="card-tools">

                {actionLoading && (
                  <span className="text-body-secondary small">

                    <span className="spinner-border spinner-border-sm me-1" />

                    Updating...

                  </span>
                )}

              </div>

            </div>

            {/* Table */}
            <div className="card-body p-0">

              <EnquiryTable
                enquiries={enquiries}
                loading={loading}
                onView={handleView}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />

            </div>

          </div>

        </div>
      </div>

      {/* Enquiry Details */}
      {selectedEnquiry && (
        <EnquiryDetails
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
        />
      )}

    </main>
  );
}