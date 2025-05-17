import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dummy login check
        if (credentials.username === "admin" && credentials.password === "admin123") {
            onLogin();
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-gray-800 p-6 shadow-md rounded-xl mt-20 text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    required
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>

    );
};

export default AdminLogin;
