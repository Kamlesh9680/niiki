import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WalletPage = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user"))?.id;

    useEffect(() => {
        const fetchWalletDetails = async () => {
            try {
                const response = await fetch(`/api/user/wallet?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch wallet data");

                const data = await response.json();
                setBalance(data.balance);
                setTransactions(data.transactions);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load wallet details. Please try again.");
                setLoading(false);
            }
        };

        fetchWalletDetails();
    }, [userId]);

    const handleDeposit = () => {
        navigate("/digitalgold")
    };

    const handleWithdraw = () => {
        navigate("/withdraw")
    };

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <div className="page-container">
                <div className="max-w-md mx-auto py-6">
                    <h1 className="text-xl font-bold text-customPurple text-center mb-4">Your Wallet</h1>

                    <div className="flex justify-between items-center bg-yellow-100 p-4 rounded mb-4">
                        <p className="font-medium">Current Balance:</p>
                        <p className="text-lg font-bold text-yellow-600 flex items-center gap-0"><img src="/coin.png" className="w-8" alt="coin" />{balance.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between mb-4">
                        <button
                            onClick={handleDeposit}
                            className="px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600"
                        >
                            Deposit
                        </button>
                        <button
                            onClick={handleWithdraw}
                            className="px-4 py-2 bg-customPurple text-white font-bold rounded hover:bg-purple-900"
                        >
                            Withdraw
                        </button>
                    </div>

                    <div className="bg-gray-100 p-4 rounded">
                        <h2 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h2>
                        {loading ? (
                            <p>Loading transactions...</p>
                        ) : transactions.length > 0 ? (
                            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 text-left">
                                        <th className="py-2 px-4 border-b">Type</th>
                                        <th className="py-2 px-4 border-b">Amount</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                        <th className="py-2 px-4 border-b">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b capitalize">{tx.type}</td>
                                            <td
                                                className={`py-2 px-4 border-b ${tx.type === "deposit" ? "text-green-500" : "text-red-500"
                                                    }`}
                                            >
                                                {tx.amount.toFixed(2)}
                                            </td>
                                            <td className="py-2 px-4 border-b">{tx.status}</td>
                                            <td className="py-2 px-4 border-b">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No transactions found.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
};

export default WalletPage;
