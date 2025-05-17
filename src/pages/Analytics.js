import React, { useEffect, useState } from "react";
import { getAllComplaints } from "../utils/FakeAPI";

const AdminAnalytics = () => {
    const [complaints, setComplaints] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllComplaints([]);
                setComplaints(data);
            } catch (err) {
                setError("Failed to load analytics");
            }
        };
        fetchData();
    }, []);

    const total = complaints.length;

    const byStatus = complaints.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
    }, {});

    const byCategory = complaints.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Admin Analytics Dashboard</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 p-4 rounded">
                    <h3 className="text-lg font-semibold">Total Complaints</h3>
                    <p className="text-2xl">{total}</p>
                </div>

                <div className="bg-gray-700 p-4 rounded">
                    <h3 className="text-lg font-semibold">By Status</h3>
                    <ul className="text-sm mt-2">
                        {Object.entries(byStatus).map(([status, count]) => (
                            <li key={status}>{status}: {count}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-700 p-4 rounded">
                    <h3 className="text-lg font-semibold">By Category</h3>
                    <ul className="text-sm mt-2">
                        {Object.entries(byCategory).map(([cat, count]) => (
                            <li key={cat}>{cat}: {count}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
