import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import "./D-inner.css"

const PendingWithdrawals = () => {
    const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendingWithdrawals = async () => {
            try {
                const response = await fetch('/api/admin/users-withdraw-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPendingWithdrawals(data.PendingWithdrawals);
            } catch (error) {
                console.error('Error fetching pending withdrawals:', error);
            }
        };

        fetchPendingWithdrawals();
    }, []);
    const handleViewDetails = (withdrawalId) => {
        navigate(`/admin/withdrawals/${withdrawalId}`, {
            state: { fromPendingPage: true }, // Pass the state here
        });
    };
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <h2>Pending Withdrawals</h2>
                    <div className="pending-withdrawals-container">
                        {pendingWithdrawals.length === 0 ? (
                            <p>No pending withdrawals at the moment.</p>
                        ) : (
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingWithdrawals.map(withdrawal => (
                                        <tr key={withdrawal.id}>
                                            <td>{withdrawal.userId}</td>
                                            <td>{withdrawal.amount}</td>
                                            <td>{withdrawal.status}</td>
                                            <td>{new Date(withdrawal.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button className="table-detail-btn" onClick={() => handleViewDetails(withdrawal.transactionId)}>
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingWithdrawals;
