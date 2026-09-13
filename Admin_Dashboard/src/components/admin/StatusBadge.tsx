import type { Enquiry } from "../../services/api";

export default function StatusBadge({ status }: { status: Enquiry["status"] }) {
  const classes: Record<Enquiry["status"], string> = {
    New: "text-bg-primary",
    Contacted: "text-bg-info",
    "In Progress": "text-bg-warning",
    Closed: "text-bg-success",
  };

  return <span className={`badge ${classes[status]}`}>{status}</span>;
}
