import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ReferralPage = () => {
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCommission, setTotalCommission] = useState(0);

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("user")).id;

                const response = await fetch(`http://localhost:5000/api/user/referrals/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch referral data");

                const data = await response.json();
                setReferrals(data.referrals);
                setTotalCommission(data.referrals.length * 50); // Commission calculation
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load referral data. Please try again.");
                setLoading(false);
            }
        };

        fetchReferralData();
    }, []);

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <div className="page-container py-6 px-4">
                <h1 className="text-xl font-bold text-customPurple text-center mb-4">
                    Referral Dashboard
                </h1>
                <div className="bg-yellow-100 p-4 rounded mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Total Referrals:</p>
                            <p className="text-lg font-bold">{referrals.length}</p>
                        </div>
                        <div>
                            <p className="font-medium">Total Commission:</p>
                            <p className="text-lg font-bold text-yellow-600 flex items-center gap-1"><img src="/coin.png" className="w-8" alt="coin" /> {totalCommission}</p>
                        </div>
                    </div>
                    <p className="fs-14 mt-2"><b>Note:</b> Commission will be added to your wallet once your referral complete the first deposit of ₹10.</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-medium text-gray-800 mb-2">Referral Members</h2>
                    {loading ? (
                        <p>Loading referrals...</p>
                    ) : referrals.length > 0 ? (
                        <ul>
                            {referrals.map((referral, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between py-2 border-b last:border-none"
                                >
                                    <span>{referral.email}</span>
                                    <span className="text-gray-500 text-sm">
                                        ID: {referral.userId}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No referrals found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferralPage;