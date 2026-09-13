import { FormEvent, useState } from "react";
interface EnquiryFormProps {
    onSuccess?: () => void;
}
const API = import.meta.env.VITE_API_URL || "/api";
type UserType = "Student" | "Customer" | "Other";
export default function EnquiryForm({ onSuccess }: EnquiryFormProps) {
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    user_type: "Customer" as UserType,
    service_interest: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const u = (k: string, v: string) => setF((x) => ({ ...x, [k]: v }));
  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    if (
      !f.name.trim() ||
      !f.email.trim() ||
      !f.phone.trim() ||
      !f.service_interest.trim()
    ) {
      setMsg("Please fill all required fields.");
      return;
    }
    try {
      setBusy(true);
      const r = await fetch(`${API}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const d = await r.json();
      if (!r.ok) throw Error(d.message || "Unable to submit enquiry.");
      setMsg("Thank you! Your enquiry has been submitted successfully.");
      setF({
        name: "",
        email: "",
        phone: "",
        user_type: "Customer",
        service_interest: "",
        message: "",
      });onSuccess?.();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Unable to submit enquiry.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="dronetv-enquiry-form" onSubmit={submit}>
      <div className="dronetv-form-grid">
        <label>
          Full Name *
          <input
            value={f.name}
            onChange={(e) => u("name", e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Email Address *
          <input
            type="email"
            value={f.email}
            onChange={(e) => u("email", e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Phone Number *
          <input
            value={f.phone}
            onChange={(e) => u("phone", e.target.value)}
            placeholder="Enter phone number"
          />
        </label>
        <label>
          User Type *
          <select
            value={f.user_type}
            onChange={(e) => u("user_type", e.target.value)}
          >
            <option>Student</option>
            <option>Customer</option>
            <option>Other</option>
          </select>
        </label>
        <label className="dronetv-full-field">
          Service / Course Interest *
          <select
            value={f.service_interest}
            onChange={(e) => u("service_interest", e.target.value)}
          >
            <option value="">Select an option</option>
            <option>Aerial Photo & Video</option>
            <option>Mapping & Surveying</option>
            <option>Inspections & Monitoring</option>
            <option>Drone Training</option>
            <option>Drone Consulting</option>
            <option>Custom Drone Solution</option>
          </select>
        </label>
        <label className="dronetv-full-field">
          Message
          <textarea
            rows={6}
            value={f.message}
            onChange={(e) => u("message", e.target.value)}
            placeholder="Tell us about your project or learning goal..."
          />
        </label>
      </div>
      {msg && <div className="dronetv-form-result">{msg}</div>}
      <button className="dronetv-submit" disabled={busy}>
        {busy ? "Submitting..." : "Submit Enquiry →"}
      </button>
    </form>
  );
}
