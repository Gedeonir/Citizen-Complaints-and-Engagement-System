
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ComplaintForm from "./components/ComplaintForm";
import TicketStatus from "./components/TicketStatus";
import AdminLogin from "./components/SignIn";
import AdminDashboard from "./pages/AdminDashboard";
import { useState } from "react";

const AppRoutes = (prop) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
  }, [isAdminLoggedIn]);

  return (
    <Router>
      <nav className="bg-gray-900 text-gray-100 px-6 py-4 flex justify-between shadow-md">
        <h1 className="font-bold text-xl text-white">Citizen Engagement</h1>
        <div className="space-x-4">
          {!isAdminLoggedIn ?
            <>
              <Link
                to="/"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Submit Complaint
              </Link>
              <Link
                to="/track"
                className="text-gray-300 hover:text-white underline-offset-4 hover:underline transition"
              >
                Track
              </Link>
              <Link
                to="/admin"
                className="text-gray-300 hover:text-white underline-offset-4 hover:underline transition"
              >
                Admin
              </Link>
            </>
            :
            <button
              onClick={() => setIsAdminLoggedIn(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
            >
              Logout
            </button>
          }
        </div>
      </nav>

      <div className="bg-gray-950 min-h-screen text-white">
        <Routes>
          <Route path="/" element={<ComplaintForm />} />
          <Route path="/track" element={<TicketStatus />} />
          <Route
            path="/admin"
            element={
              isAdminLoggedIn
                ? <AdminDashboard />
                : <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
            }
          />
        </Routes>
      </div>
    </Router>

  );
};

export default AppRoutes;