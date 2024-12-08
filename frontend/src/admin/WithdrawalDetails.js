import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { toast } from "react-toastify";

const WithdrawalDetails = () => {
    const { withdrawalId } = useParams();
    const [withdrawalDetails, setWithdrawalDetails] = useState(null);
    const location = useLocation();
    const [isFromPendingPage, setIsFromPendingPage] = useState(false);

    useEffect(() => {
        if (location.state && location.state.fromPendingPage) {
            setIsFromPendingPage(true);
        }
        const fetchWithdrawalDetails = async () => {
            try {
                const response = await fetch(`/api/admin/withdrawals/${withdrawalId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setWithdrawalDetails(data[0]);
                }
            } catch (error) {
                console.error('Error fetching withdrawal details:', error);
            }
        };

        fetchWithdrawalDetails();
    }, [withdrawalId, location]);


    const handleApprove = async () => {
        try {
            await fetch(`/api/admin/withdraw/deduct/${withdrawalId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: withdrawalDetails.amount }),
            });

            setWithdrawalDetails((prevDetails) => ({
                ...prevDetails,
                status: 'success',
            }));
            toast.success("Withdrawal approved successfully!");

        } catch (error) {
            console.error('Error approving withdrawal:', error);
            toast.error("Error approving Withdrawal!");
        }
    };

    const handleDecline = async () => {
        try {
            await fetch(`/api/admin/withdrawals/decline/${withdrawalId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            setWithdrawalDetails((prevDetails) => ({
                ...prevDetails,
                status: 'rejected',
            }));
            toast.success("Withdrawal rejected successfully!");
        } catch (error) {
            console.error('Error declining withdrawal:', error);
            toast.error("Error rejecting Withdrawal!");
        }
    };

    if (!withdrawalDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap deposit-details flex flex-col items-center gap-4">
                    <h2>{withdrawalDetails.userEmail} requested {withdrawalDetails.amount}</h2>
                    <div className="details-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>User Email</th>
                                    <th>Withdrawal Amount</th>
                                    <th>Status</th>
                                    <th>Date Requested</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{withdrawalDetails.userId}</td>
                                    <td>{withdrawalDetails.userEmail}</td>
                                    <td>{withdrawalDetails.amount}</td>
                                    <td>{withdrawalDetails.status}</td>
                                    <td>{new Date(withdrawalDetails.createdAt).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    {isFromPendingPage && (
                        <div className="dt-action-buttons">
                            <button className='am-user-det-btn theme-btn' onClick={handleApprove} disabled={withdrawalDetails.status === 'success'}>
                                Approve Withdrawal
                            </button>
                            <button className='am-user-det-btn theme-btn-border' onClick={handleDecline}  disabled={withdrawalDetails.status === 'rejected'}>
                                Decline Withdrawal
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WithdrawalDetails;
