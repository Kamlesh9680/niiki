import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const formatCurrency = (value) => {
    return `₹${value.toLocaleString()}`;
};

const AddMoney = () => {
    const location = useLocation();
    const [amount, setAmount] = useState(10);
    const [transactionId, setTransactionId] = useState('');
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserId(user.id);
            setUserEmail(user.email);
        }

        const params = new URLSearchParams(location.search);
        const money = params.get('money');
        const fromModal = params.get("fromModal") === "true";
        if (money) {
            setAmount(money);
        }
        const bottomNav = document.querySelector(".bottom-nav");

        if (bottomNav) {
            // Hide the bottom nav if `fromModal=true`
            bottomNav.style.display = fromModal ? "none" : "block";
        }
    }, [location]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Prepare the data to send to the backend
        const depositData = {
            userId,
            userEmail,
            amount,
            transactionId,
            status: 'pending',  // Default status
            createdAt: new Date().toISOString()
        };

        try {
            // Send the deposit data to the backend via a POST request
            const response = await axios.post('http://localhost:5000/api/deposit-request', depositData);

            if (response.data.success) {
                toast.success("Deposit request submitted successfully!");
            } else {
                toast.success('Error submitting deposit request.');
            }
        } catch (error) {
            console.error('Error while submitting deposit:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper max-w-[480px] mx-auto py-8 px-4">
            <div className="page-container">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-customPurple">Add Money</h1>
                    <p className="text-yellow-500 text-lg mt-2">Proceed with the payment to add money to your account</p>
                </div>

                <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-customPurple">You Are Adding:</h2>
                    <div className="flex justify-between items-center">
                        <span className="text-lg text-gray-700">Amount:</span>
                        <span className="text-xl font-semibold text-customPurple">{formatCurrency(amount)}</span>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl text-customPurple">Scan the QR code to complete payment</h3>
                        <div className="flex justify-center my-4">
                            <img
                                src="/qr.jpg"
                                alt="QR Code"
                                className="w-60 h-60 rounded-lg border-2 border-gray-300"
                            />
                        </div>
                        <p className="text-gray-700">After payment, enter the transaction ID below.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <div className="flex justify-between items-center">
                            <label htmlFor="upiTransactionId" className="text-gray-800 font-medium">UPI Transaction ID</label>
                            <input
                                type="text"
                                id="upiTransactionId"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                placeholder="Enter UPI Transaction ID"
                                className="border-2 border-customPurple rounded-lg px-4 py-2 text-gray-700"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-customPurple text-white py-2 rounded-lg hover:bg-customPurple-600 focus:outline-none transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Confirm Payment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMoney;