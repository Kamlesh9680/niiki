import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        // Basic validation
        if (!email || !password) {
            setError("Both email and password are required.");
            return;
        }

        try {
            setLoading(true); // Start loading
            setError(""); // Clear any previous error

            // Make a POST request to the backend
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid email or password");
            }

            // Handle successful login
            localStorage.setItem("userToken", JSON.stringify(data.token)); 
            localStorage.setItem("user", JSON.stringify(data.user)); 
            navigate("/");
        } catch (err) {
            setError(err.message); // Display error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Login
                    </h2>

                    {error && (
                        <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#3c0050] text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                            disabled={loading} // Disable button during loading
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-yellow-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
