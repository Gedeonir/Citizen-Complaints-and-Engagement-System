import React, { useState } from "react";
import { getComplaintById } from "../utils/FakeAPI";

const TicketStatus = () => {
    const [ticketId, setTicketId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setData(null);

        try {
            const response = await getComplaintById(ticketId);
            setData(response);
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-gray-800 p-6 shadow-md rounded-xl mt-10 text-white">
            <h2 className="text-2xl font-bold mb-4">Track Complaint Status</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="ticketId"
                    placeholder="Enter Ticket ID"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Check Status
                </button>
            </form>

            {data && (
                <div className="mt-4 p-4 bg-gray-700 border border-gray-600 rounded space-y-2">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Complaint Details</h3>

                    <p><strong>Ticket ID:</strong> {data.id}</p>
                    <p><strong>Title:</strong> {data.title}</p>
                    <p><strong>Description:</strong> {data.description}</p>
                    <p><strong>Category:</strong> {data.category}</p>
                    <p><strong>Status:</strong> <span className="text-green-400">{data.status}</span></p>
                    <p><strong>Location:</strong> {data.province}, {data.district}, {data.sector}, {data.cell}, {data.village}</p>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-700 border border-red-600 rounded">
                    <p className="text-sm text-red-200">{error}</p>
                </div>
            )}
        </div>
    );
};

export default TicketStatus;
