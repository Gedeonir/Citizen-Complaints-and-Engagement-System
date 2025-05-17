const API_URL = "http://localhost:5000/complaints";

// Submit a new complaint
export const submitComplaint = async (newComplaint) => {
  newComplaint.status = "Submitted";
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComplaint),
  });
  const data=await res.json();
  return data;
};

// Get a complaint by ID
export const getComplaintById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return await res.json();
};

// Get all complaints
export const getAllComplaints = async (params) => {
  let url=API_URL;
  if (params.length > 0) {
    url += "?" + params.join("&");
  }
  const res = await fetch(url);
  return await res.json();
};

// Update complaint status
export const updateComplaintStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res;
};

// Delete complaint
export const deleteComplaint = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.ok;
};
