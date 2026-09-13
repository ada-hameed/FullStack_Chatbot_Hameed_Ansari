import { useMemo, useState } from "react";
import type { Enquiry } from "../../services/api";

interface EnquiryTableProps {
  enquiries: Enquiry[];
  loading: boolean;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (
    id: number,
    status: Enquiry["status"]
  ) => void;
}

type SortKey =
  | "id"
  | "name"
  | "email"
  | "phone"
  | "user_type"
  | "service_interest"
  | "status"
  | "created_at";

function EnquiryTable({
  enquiries,
  loading,
  onView,
  onDelete,
  onStatusChange,
}: EnquiryTableProps) {
  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState("");
  const [status, setStatus] = useState("");

  const [sortKey, setSortKey] =
    useState<SortKey>("created_at");

  const [sortAsc, setSortAsc] = useState(false);

  const [page, setPage] = useState(1);

  const pageSize = 10;

  // --------------------------------
  // SEARCH + FILTER
  // --------------------------------

  const filteredEnquiries = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const matchesSearch =
        !searchText ||
        enquiry.name
          .toLowerCase()
          .includes(searchText) ||
        enquiry.email
          .toLowerCase()
          .includes(searchText) ||
        enquiry.phone
          .toLowerCase()
          .includes(searchText) ||
        (enquiry.service_interest || "")
          .toLowerCase()
          .includes(searchText);

      const matchesUserType =
        !userType ||
        enquiry.user_type === userType;

      const matchesStatus =
        !status ||
        enquiry.status === status;

      return (
        matchesSearch &&
        matchesUserType &&
        matchesStatus
      );
    });
  }, [
    enquiries,
    search,
    userType,
    status,
  ]);

  // --------------------------------
  // SORTING
  // --------------------------------

  const sortedEnquiries = useMemo(() => {
    const data = [...filteredEnquiries];

    data.sort((a, b) => {
      let valueA: string | number = "";
      let valueB: string | number = "";

      if (sortKey === "id") {
        valueA = a.id;
        valueB = b.id;
      } else if (sortKey === "created_at") {
        valueA = new Date(
          a.created_at
        ).getTime();

        valueB = new Date(
          b.created_at
        ).getTime();
      } else {
        valueA = String(
          a[sortKey] ?? ""
        ).toLowerCase();

        valueB = String(
          b[sortKey] ?? ""
        ).toLowerCase();
      }

      if (valueA < valueB) {
        return sortAsc ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortAsc ? 1 : -1;
      }

      return 0;
    });

    return data;
  }, [
    filteredEnquiries,
    sortKey,
    sortAsc,
  ]);

  // --------------------------------
  // PAGINATION
  // --------------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedEnquiries.length / pageSize
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const paginatedEnquiries =
    sortedEnquiries.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  // --------------------------------
  // SORT HANDLER
  // --------------------------------

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((previous) => !previous);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }

    setPage(1);
  };

  // --------------------------------
  // CLEAR FILTERS
  // --------------------------------

  const clearFilters = () => {
    setSearch("");
    setUserType("");
    setStatus("");
    setPage(1);
  };

  // --------------------------------
  // STATUS CLASS
  // --------------------------------

  const getStatusClass = (
    value: Enquiry["status"]
  ) => {
    switch (value) {
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

  // --------------------------------
  // USER TYPE CLASS
  // --------------------------------

  const getUserTypeClass = (
    value: Enquiry["user_type"]
  ) => {
    switch (value) {
      case "Student":
        return "text-bg-primary";

      case "Customer":
        return "text-bg-success";

      default:
        return "text-bg-secondary";
    }
  };

  // --------------------------------
  // DATE FORMAT
  // --------------------------------

  const formatDate = (date: string) => {
    if (!date) return "—";

    const formatted = new Date(date);

    return (
      <>
        <div className="fw-semibold">
          {formatted.toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )}
        </div>

        <small className="text-body-secondary">
          {formatted.toLocaleTimeString(
            "en-IN",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </small>
      </>
    );
  };

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-3 mb-0 text-body-secondary">
          Loading enquiries...
        </p>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          /* ============================
             TABLE
          ============================ */

          .dronetv-enquiry-table {
            width: 100%;
            margin: 0;
            font-size: 12px;
            table-layout: fixed;
          }

          .dronetv-enquiry-table th {
            font-size: 11px;
            font-weight: 700;
            padding: 9px 6px;
            white-space: nowrap;
            vertical-align: middle;
          }

          .dronetv-enquiry-table td {
            font-size: 12px;
            padding: 8px 6px;
            vertical-align: middle;
          }

          /* ============================
             LONG TEXT FIX
          ============================ */

          .dronetv-enquiry-table
          .email-cell,

          .dronetv-enquiry-table
          .phone-cell,

          .dronetv-enquiry-table
          .interest-cell {

            overflow-wrap: anywhere;
            word-break: break-word;
            white-space: normal;
            line-height: 1.35;
          }

          .dronetv-enquiry-table
          .name-cell {

            white-space: normal;
            overflow-wrap: break-word;
            word-break: normal;
            line-height: 1.3;
          }

          /* ============================
             BADGES
          ============================ */

          .dronetv-enquiry-table .badge {
            font-size: 10px;
            padding: 4px 6px;
            font-weight: 600;
            white-space: nowrap;
          }

          /* ============================
             STATUS SELECT
          ============================ */

          .dronetv-enquiry-table
          .status-select {

            width: 100%;
            min-width: 0;
            height: 29px;

            padding: 3px 20px 3px 5px;

            font-size: 10px;
            font-weight: 600;

            cursor: pointer;
          }

          /* ============================
             ACTION BUTTONS
          ============================ */

          .dronetv-enquiry-table
          .action-btn {

            width: 27px;
            height: 27px;

            padding: 0;

            display: inline-flex;
            align-items: center;
            justify-content: center;

            font-size: 11px;
          }

          /* ============================
             FILTERS
          ============================ */

          .dronetv-filter-input {
            height: 34px;
            font-size: 12px;
          }

          .dronetv-filter-select {
            height: 34px;
            font-size: 12px;
          }

          .dronetv-filter-icon {
            height: 34px;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* ============================
             SORT
          ============================ */

          .dronetv-sort {
            cursor: pointer;
            user-select: none;
          }

          .dronetv-sort:hover {
            background-color: rgba(0, 0, 0, 0.03);
          }

          /* ============================
             PAGINATION
          ============================ */

          .dronetv-pagination button {
            min-width: 32px;
            height: 32px;
            font-size: 12px;
          }

          /* ============================
             RESPONSIVE
          ============================ */

          @media (max-width: 1200px) {

            .dronetv-enquiry-table th {
              font-size: 10px;
              padding: 8px 4px;
            }

            .dronetv-enquiry-table td {
              font-size: 11px;
              padding: 7px 4px;
            }

            .dronetv-enquiry-table .badge {
              font-size: 9px;
              padding: 3px 5px;
            }

            .dronetv-enquiry-table
            .status-select {

              font-size: 9px;
              padding-left: 4px;
              padding-right: 18px;
            }

            .dronetv-enquiry-table
            .action-btn {

              width: 25px;
              height: 25px;
              font-size: 10px;
            }
          }
        `}
      </style>

      {/* =====================================
          FILTER SECTION
      ===================================== */}

      <div className="border-bottom bg-body-tertiary p-3">
        <div className="row g-2 align-items-center">

          {/* SEARCH */}

          <div className="col-12 col-lg-5">
            <div className="input-group">

              <span className="input-group-text dronetv-filter-icon">
                <i className="bi bi-search" />
              </span>

              <input
                type="text"
                className="form-control dronetv-filter-input"
                placeholder="Search name, email, phone or interest..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

            </div>
          </div>

          {/* USER TYPE */}

          <div className="col-12 col-sm-6 col-lg-2">
            <select
              className="form-select dronetv-filter-select"
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setPage(1);
              }}
            >
              <option value="">
                All Users
              </option>

              <option value="Student">
                Student
              </option>

              <option value="Customer">
                Customer
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* STATUS */}

          <div className="col-12 col-sm-6 col-lg-2">
            <select
              className="form-select dronetv-filter-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">
                All Status
              </option>

              <option value="New">
                New
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Closed">
                Closed
              </option>
            </select>
          </div>

          {/* CLEAR */}

          

        </div>
      </div>

      {/* =====================================
          RESULT COUNT
      ===================================== */}

      

      {/* =====================================
          TABLE
      ===================================== */}

      <div className="w-100">

        <table
          className="
            table
            table-hover
            align-middle
            mb-0
            dronetv-enquiry-table
          "
        >

          {/* COLUMN WIDTHS */}

          <colgroup>

            <col style={{ width: "5%" }} />

            <col style={{ width: "10%" }} />

            <col style={{ width: "19%" }} />

            <col style={{ width: "10%" }} />

            <col style={{ width: "10%" }} />

            <col style={{ width: "12%" }} />

            <col style={{ width: "12%" }} />

            <col style={{ width: "14%" }} />

            <col style={{ width: "8%" }} />

          </colgroup>

          {/* HEADER */}

          <thead>
            <tr>

              <th
                className="text-center dronetv-sort"
                onClick={() =>
                  handleSort("id")
                }
              >
                ID

                {sortKey === "id" && (
                  <i
                    className={`bi ms-1 ${
                      sortAsc
                        ? "bi-arrow-up"
                        : "bi-arrow-down"
                    }`}
                  />
                )}
              </th>

              <th
                className="dronetv-sort"
                onClick={() =>
                  handleSort("name")
                }
              >
                Name

                {sortKey === "name" && (
                  <i
                    className={`bi ms-1 ${
                      sortAsc
                        ? "bi-arrow-up"
                        : "bi-arrow-down"
                    }`}
                  />
                )}
              </th>

              <th
                className="dronetv-sort"
                onClick={() =>
                  handleSort("email")
                }
              >
                Email

                {sortKey === "email" && (
                  <i
                    className={`bi ms-1 ${
                      sortAsc
                        ? "bi-arrow-up"
                        : "bi-arrow-down"
                    }`}
                  />
                )}
              </th>

              <th
                className="dronetv-sort"
                onClick={() =>
                  handleSort("phone")
                }
              >
                Phone

                {sortKey === "phone" && (
                  <i
                    className={`bi ms-1 ${
                      sortAsc
                        ? "bi-arrow-up"
                        : "bi-arrow-down"
                    }`}
                  />
                )}
              </th>

              <th
                className="text-center dronetv-sort"
                onClick={() =>
                  handleSort("user_type")
                }
              >
                User Type

                {sortKey === "user_type" && (
                  <i
                    className={`bi ms-1 ${
                      sortAsc
                        ? "bi-arrow-up"
                        : "bi-arrow-down"
                    }`}
                  />
                )}
              </th>

              <th
                className="dronetv-sort"
                onClick={() =>
                  handleSort(
                    "service_interest"
                  )
                }
              >
                Interest

                {sortKey ===
                  "service_interest" && (
                  <i
                    className={`bi ms-1 ${
                      sortAsc
                        ? "bi-arrow-up"
                        : "bi-arrow-down"
                    }`}
                  />
                )}
              </th>

              <th
                className="dronetv-sort"
                onClick={() =>
                  handleSort("status")
                }
              >
                Status

                {sortKey === "status" && (
                  <i
                    className={`bi ms-1 ${
                      sortAsc
                        ? "bi-arrow-up"
                        : "bi-arrow-down"
                    }`}
                  />
                )}
              </th>

              <th
                className="dronetv-sort"
                onClick={() =>
                  handleSort("created_at")
                }
              >
                Date

                {sortKey ===
                  "created_at" && (
                  <i
                    className={`bi ms-1 ${
                      sortAsc
                        ? "bi-arrow-up"
                        : "bi-arrow-down"
                    }`}
                  />
                )}
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>
          </thead>

          {/* BODY */}

          <tbody>

            {paginatedEnquiries.length ===
            0 ? (
              <tr>

                <td
                  colSpan={9}
                  className="text-center py-5 text-body-secondary"
                >
                  <i className="bi bi-inbox fs-3 d-block mb-2" />

                  No enquiries found
                </td>

              </tr>
            ) : (

              paginatedEnquiries.map(
                (enquiry) => (
                  <tr key={enquiry.id}>

                    {/* ID */}

                    <td className="text-center text-body-secondary">
                      #{enquiry.id}
                    </td>

                    {/* NAME */}

                    <td>
                      <div className="name-cell fw-semibold">
                        {enquiry.name}
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td>
                      <div className="email-cell">
                        {enquiry.email}
                      </div>
                    </td>

                    {/* PHONE */}

                    <td>
                      <div className="phone-cell">
                        {enquiry.phone}
                      </div>
                    </td>

                    {/* USER TYPE */}

                    <td className="text-center">

                      <span
                        className={`badge ${getUserTypeClass(
                          enquiry.user_type
                        )}`}
                      >
                        {enquiry.user_type}
                      </span>

                    </td>

                    {/* INTEREST */}

                    <td>
                      <div className="interest-cell">
                        {enquiry.service_interest ||
                          "—"}
                      </div>
                    </td>

                    {/* STATUS */}

                    <td>

                      <select
                        className={`form-select status-select ${getStatusClass(
                          enquiry.status
                        )}`}
                        value={
                          enquiry.status
                        }
                        onChange={(e) =>
                          onStatusChange(
                            enquiry.id,
                            e.target
                              .value as Enquiry["status"]
                          )
                        }
                      >

                        <option value="New">
                          New
                        </option>

                        <option value="Contacted">
                          Contacted
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Closed">
                          Closed
                        </option>

                      </select>

                    </td>

                    {/* DATE */}

                    <td>
                      {formatDate(
                        enquiry.created_at
                      )}
                    </td>

                    {/* ACTIONS */}

                    <td className="text-center">

                      <div className="d-flex justify-content-center gap-1">

                        <button
                          type="button"
                          className="btn btn-outline-primary action-btn"
                          title="View Details"
                          onClick={() =>
                            onView(
                              enquiry.id
                            )
                          }
                        >
                          <i className="bi bi-eye" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-danger action-btn"
                          title="Delete Enquiry"
                          onClick={() =>
                            onDelete(
                              enquiry.id
                            )
                          }
                        >
                          <i className="bi bi-trash" />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )

            )}

          </tbody>

        </table>

      </div>

      {/* =====================================
          PAGINATION
      ===================================== */}

      <div className="d-flex justify-content-between align-items-center border-top px-3 py-3">

        <div className="text-body-secondary small">

          Page{" "}

          <strong>
            {currentPage}
          </strong>

          {" of "}

          <strong>
            {totalPages}
          </strong>

        </div>

        <div className="d-flex dronetv-pagination" style={{ gap: "0.5rem" }}>

          {/* PREVIOUS */}

          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={currentPage === 1}
            onClick={() =>
              setPage((previous) =>
                Math.max(
                  1,
                  previous - 1
                )
              )
            }
          >
            <i className="bi bi-chevron-left" />
          </button>

          {/* PAGE NUMBERS */}

          {Array.from(
            { length: totalPages },
            (_, index) =>
              index + 1
          ).map((pageNumber) => (

            <button
              key={pageNumber}
              type="button"
              className={`btn ${
                currentPage ===
                pageNumber
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
                setPage(pageNumber)
              }
            >
              {pageNumber}
            </button>

          ))}

          {/* NEXT */}

          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              setPage((previous) =>
                Math.min(
                  totalPages,
                  previous + 1
                )
              )
            }
          >
            <i className="bi bi-chevron-right" />
          </button>

        </div>

      </div>
    </>
  );
}

export default EnquiryTable;