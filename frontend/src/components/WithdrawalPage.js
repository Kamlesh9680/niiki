import React, { useState } from "react";
import { toast } from "react-toastify";
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

const WithdrawalPage = () => {
    const [amount, setAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const handleWithdraw = async () => {
        if (!amount || !walletAddress) {
            toast.error("Please fill in all the fields.");
            return;
        }

        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount < 500) {
            toast.error("The minimum withdrawal amount is 500.");
            return;
        }

        setLoading(true);

        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;

            const response = await fetch("/api/withdraw-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    amount: withdrawAmount,
                    walletAddress,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Withdrawal request submitted successfully!");
                setAmount("");
                setWalletAddress("");
            } else {
                toast.error(data.message || "Failed to submit withdrawal request.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <Header />
            <div className="page-container py-6 px-4">
                <h1 className="text-xl font-bold text-customPurple text-center mb-4">
                    Withdrawal Page
                </h1>

                <div className="bg-gray-100 p-4 rounded">
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                            Withdrawal Amount (min: 500)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            className="w-full px-4 py-2 border rounded"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="walletAddress"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            UPI ID
                        </label>
                        <input
                            type="text"
                            id="walletAddress"
                            className="w-full px-4 py-2 border rounded"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleWithdraw}
                        disabled={loading}
                        className={`w-full px-4 py-2 font-bold rounded ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-customPurple text-white hover:bg-purple-900"
                            }`}
                    >
                        {loading ? "Submitting..." : "Withdraw"}
                    </button>
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default WithdrawalPage;
