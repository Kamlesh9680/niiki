import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        invitedFrom: "",
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const inviteCode = urlParams.get('inviteCode');
        if (inviteCode) {
            setFormData(prevData => ({
                ...prevData,
                invitedFrom: inviteCode,
            }));
        }
    }, []);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, password, confirmPassword, invitedFrom } = formData;

        // Basic validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, phone, password, invitedFrom }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setError("");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };


    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Register
                    </h2>

                    {error && (
                        <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-4">

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-4">

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div className="mb-4">

                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                name="invitedFrom"
                                value={formData.invitedFrom}
                                onChange={handleChange}
                                placeholder="Invitation Code"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#3c0050] text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-yellow-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
