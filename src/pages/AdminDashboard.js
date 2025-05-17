import React, { useEffect, useState } from "react";
import { getAllComplaints, getComplaintById, updateComplaintStatus } from "../utils/FakeAPI";

const API_URL = "http://localhost:5000/complaints";

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);

    // Fetch complaints from backend
    const fetchComplaints = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getAllComplaints();
            setComplaints(res);
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    // Handle status change
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await updateComplaintStatus(id, newStatus);
            const ticket = await getComplaintById(id);

            fetch("https://budget-be.onrender.com/api/status/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ticket),
            })

            // Update local state to reflect change immediately
            setComplaints((prev) =>
                prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
            );
        } catch (err) {
            console.log(err.message || "Error updating status");
        }
    };


    const viewComplaints = async (id) => {
        try {
            setOpen(true)
            const response = await getComplaintById(id);
            setData(response);
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <p className="text-center text-white mt-10">Loading complaints...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 mt-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            <div className="overflow-x-auto bg-gray-800 shadow-md rounded-xl">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-700 text-left text-gray-200">
                            <th className="p-3">Ticket ID</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Change status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr
                                key={complaint.id}
                                className="border-t border-gray-700 hover:bg-gray-700 transition"
                            >
                                <td className="p-3">{complaint.id}</td>
                                <td onClick={() => viewComplaints(complaint.id)} className="p-3 text-blue-400 cursor-pointer hover:text-blue-600">{complaint.title}</td>
                                <td className="p-3">{complaint.category}</td>
                                <td className="p-3">{complaint.status}</td>
                                <td className="p-3">
                                    <select
                                        className="bg-gray-700 text-white border border-gray-600 p-1 rounded"
                                        value={complaint.status}
                                        onChange={(e) =>
                                            handleStatusChange(complaint.id, e.target.value)
                                        }
                                    >
                                        <option>Submitted</option>
                                        <option>In Progress</option>
                                        <option>Resolved</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data && (
                <div onClick={()=>setData(null)} className="absolute bg-slate-950 bg-opacity-50 inset-0 flex items-center justify-center z-50">
                    <div className="p-4 bg-gray-700 border border-gray-600 rounded space-y-2">
                        <h3 className="text-xl font-bold text-blue-400 mb-2">Complaint Details</h3>

                        <p><strong>Ticket ID:</strong> {data.id}</p>
                        <p><strong>Title:</strong> {data.title}</p>
                        <p><strong>Description:</strong> {data.description}</p>
                        <p><strong>Category:</strong> {data.category}</p>
                        <p><strong>Status:</strong> <span className="text-green-400">{data.status}</span></p>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>Contact:</strong> {data.contact}</p>
                        <p><strong>Location:</strong> {data.province}, {data.district}, {data.sector}, {data.cell}, {data.village}</p>
                        <p className="italic"><strong>Description</strong> <br/>{data.description}</p>

                    
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
