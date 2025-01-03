import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import { FaCoins } from "react-icons/fa"; // Icon for coins
import { GiGoldBar } from "react-icons/gi"; // Icon for gold bars

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
    <div className="page-wrapper max-w-[480px] mx-auto bg-gradient-to-b from-yellow-50 to-yellow-100 min-h-screen">
      <Header />
      <div className="page-container px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-yellow-800 flex items-center justify-center">
            <GiGoldBar className="mr-2 text-yellow-600" /> Buy Digital Gold
          </h1>
          <p className="text-yellow-600 text-lg mt-2 font-medium">
            1 Gold Coin = 1 INR
          </p>
          <p className="text-gray-700 mt-4 text-sm">
            Invest in digital gold today! Buy gold coins securely at the price
            of 1 INR per coin. Refer and earn{" "}
            <span className="text-yellow-600 font-bold">50 coins (₹50)</span> per
            referral.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-yellow-300">
          <h2 className="text-2xl font-semibold text-yellow-800 text-center mb-4">
            Minimum ₹10
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="amount"
                className="text-gray-800 font-medium text-sm"
              >
                Enter Amount in ₹
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                min="10"
                className="border-2 border-yellow-400 rounded-lg px-4 py-2 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>

            {/* Total Gold Coins */}
            <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-lg border border-yellow-300">
              <span className="text-lg text-gray-800 font-medium">
                Total Gold Coins:
              </span>
              <span className="text-2xl font-bold text-yellow-800 flex items-center">
                <FaCoins className="mr-2" />
                {coins}
              </span>
            </div>

            {/* Buy Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 focus:outline-none transition duration-300 font-semibold text-lg shadow-md"
            >
              Buy Now
            </button>
          </form>
        </div>

        {/* Why Buy Digital Gold */}
        <div className="mt-10 text-center text-gray-800 space-y-4">
          <h3 className="text-xl font-semibold text-yellow-800">
            Why Buy Digital Gold?
          </h3>
          <p className="text-sm">
            Digital gold offers you the flexibility to invest in gold with just
            a click. No need for storage or physical handling. It's secure, and
            your investment grows with time.
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default DigitalGold;
