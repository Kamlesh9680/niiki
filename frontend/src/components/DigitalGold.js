import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const DigitalGold = () => {
    const [amount, setAmount] = useState(10); // Default minimum amount
    const [coins, setCoins] = useState(10); // Default coins based on minimum INR (10 INR = 10 coins)

    const handleAmountChange = (event) => {
        const value = event.target.value;
        if (value >= 10) {
            setAmount(value);
            setCoins(value); // Since 1 INR = 1 Gold Coin, we set coins as the value entered
        } else {
            setAmount(10); // Enforce minimum value
            setCoins(10); // Enforce minimum coins
        }
    };

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass amount as query parameter in the URL
        navigate(`/addmoney?money=${amount}`);
    };

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <div className="page-container">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-customPurple">Buy Digital Gold</h1>
                    <p className="text-yellow-500 text-lg mt-2">1 Gold Coin = 1 INR</p>
                    <p className="text-gray-700 mt-4">
                        Invest in digital gold today! Buy gold coins securely at the price of 1 INR per coin. Refer and earn 50 coin (₹50) per referral.
                    </p>
                </div>

                <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-customPurple">Minimum ₹10</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="amount" className="text-gray-800 font-medium">Amount in ₹</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={handleAmountChange}
                                min="10"
                                className="border-2 border-customPurple rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg text-gray-700">Total Gold Coins:</span>
                            <span className="text-xl font-semibold text-customPurple">{coins}</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-customPurple text-white py-2 rounded-lg hover:bg-customPurple-600 focus:outline-none transition duration-300"
                        >
                            Buy Now
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-gray-600">
                    <h3 className="text-xl font-semibold text-customPurple">Why Buy Digital Gold?</h3>
                    <p className="mt-2">Digital gold offers you the flexibility to invest in gold with just a click. No need for storage or physical handling. It's secure, and your investment grows with time.</p>
                </div>
            </div>
        </div>
    );
};

export default DigitalGold;
