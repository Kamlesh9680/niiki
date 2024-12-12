import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [phone, setPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phone || !newPassword) {
            toast.info("Please fill in all fields")
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/forgot-password", {
                phone,
                newPassword,
            });

            toast.success("Password updated successfully.");
            navigate('/login');
            setPhone("");
            setNewPassword("");
        } catch (error) {
            console.error(error)
            toast.error("Error updating password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                    <div className="flex flex-col items-center">
                        <img src="/logo2.png" alt="logo" className="w-20" />
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                            Forgot Password
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="newPassword" className="mb-2 text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2 px-4 text-white rounded-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                                } focus:outline-none focus:ring focus:ring-blue-300`}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
