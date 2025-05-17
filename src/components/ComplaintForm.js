import React, { useEffect, useState } from "react";
import { locations } from "../utils/locations";
import { submitComplaint } from "../utils/FakeAPI";

const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        email: "",
        contact: "",
        province: "",
        district: "",
        sector: "",
        cell: "",
        village: ""
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [cells, setCells] = useState([]);
    const [villages, setVillages] = useState([]);

    const getProvinces = () => {
        const provincesList = Object.keys(locations)
        setProvinces(provincesList);
    }

    const getDistricts = (provinceName) => {
        try {
            const data = locations[provinceName];
            districts.length = 0;
            const districtsList = Object.keys(data);
            setDistricts(districtsList);
        } catch (error) {
            console.log(error)
        }

    }

    const getSectors = (provinceName, districtName) => {
        try {
            const data = locations[provinceName][districtName];
            sectors.length = 0;
            const sectorsList = Object.keys(data);
            setSectors(sectorsList);
        } catch (error) {
            console.log(error);
        }

    }

    const getCells = (provinceName, districtName, sectorName) => {
        try {
            const data = locations[provinceName][districtName][sectorName];
            cells.length = 0;
            const cellsList = Object.keys(data);
            setCells(cellsList);
        } catch (error) {
            console.log(error);
        }

    }

    const getVillages = (provinceName, districtName, sectorName, cellName) => {
        try {
            const data = locations[provinceName][districtName][sectorName][cellName];
            villages.length = 0;
            const villagesList = Object.values(data);
            setVillages(villagesList);
        } catch (error) {
            console.log(error);
        }

    }

    const categories = ["Electricity", "Water", "Sanitation", "Roads", "Other"];


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reg = new RegExp('^((072|078|073))[0-9]{7}$', 'i');


        // Basic validation
        for (let key in formData) {

            if (!formData[key].trim()) {
                setError(`Please fill in the "${key}" field.`);
                return;
            }
        }

        if (!reg.test(formData.contact)) {
            setError(`Enter a valid phone number.`);
            return;
        }

        try {
            const ticket = await submitComplaint(formData);
            await fetch("https://budget-be.onrender.com/api/sendEmail",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ticket),
            })
            setSuccess(`Complaint submitted! Your ticket ID: ${ticket.id}`);
            setFormData({ title: "", category: "", description: "", location: "", contact: "" });
        } catch (err) {
            setError("Something went wrong while submitting the complaint.");
        }
    };

    useEffect(() => {
        getProvinces();
    }, []);

    return (
        <div className="max-w-5xl mx-auto bg-gray-800 p-6 shadow-md rounded-xl mt-10 text-white">
            <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
            {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}
            {success && <p className="text-green-600 bg-green-100 p-2 rounded">{success}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                <div className="space-y-4">
                    <div>
                        <label className="text-gray-300 px-2 my-2 italic font-bold">Complaint Description</label>
                    </div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                        onChange={handleChange}
                    />
                    <select
                        name="category"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <textarea
                        name="description"
                        placeholder="Description"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                        rows="4"
                        onChange={handleChange}
                    />

                    <div>
                        <label className="text-gray-300 px-2 my-2 italic font-bold">Contact details</label>
                    </div>

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter email"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="contact"
                        placeholder="Contact"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-gray-300 px-2 my-2 italic font-bold">Location</label>
                    </div>
                    <select
                        name="province"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                province: e.target.value,
                            })
                            getDistricts(e.target.value)
                        }}
                    >
                        <option value="">Select province</option>
                        {provinces.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        name="district"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                district: e.target.value,
                            })
                            getSectors(formData.province, e.target.value)
                        }}
                    >
                        <option value="">Select District</option>
                        {districts.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        name="sector"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                sector: e.target.value,
                            }),
                                getCells(formData.province, formData.district, e.target.value)
                        }}
                    >
                        <option value="">Select Sector</option>
                        {sectors.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        name="category"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                cell: e.target.value,
                            });
                            getVillages(formData.province, formData.district, formData.sector, e.target.value)
                        }}
                    >
                        <option value="">Select cell</option>
                        {cells.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        name="category"
                        required
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                village: e.target.value,
                            });
                        }}
                    >
                        <option value="">Select village</option>
                        {villages.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>

    );
};

export default ComplaintForm;
