const API_URL = "http://localhost:5000/api";

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: "Student" | "Customer" | "Other";
  service_interest: string | null;
  message: string | null;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  created_at: string;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed.");
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Unable to connect to the server.");
    }
    throw error;
  }
}

export const getEnquiries = async (search = "", userType = "") => {
  const params = new URLSearchParams();
  if (search.trim()) params.append("search", search.trim());
  if (userType) params.append("user_type", userType);

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return request<{ enquiries: Enquiry[] }>(`${API_URL}/enquiries${suffix}`);
};

export const getEnquiryById = async (id: number) =>
  request<{ enquiry: Enquiry }>(`${API_URL}/enquiries/${id}`);

export const updateEnquiryStatus = async (
  id: number,
  status: Enquiry["status"],
) =>
  request<{ enquiry: Enquiry }>(`${API_URL}/enquiries/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

export const deleteEnquiry = async (id: number) =>
  request<{ enquiry: Enquiry }>(`${API_URL}/enquiries/${id}`, {
    method: "DELETE",
  });
