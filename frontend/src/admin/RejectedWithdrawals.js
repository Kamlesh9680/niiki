import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import "./D-inner.css"

const RejectedWithdrawals = () => {
    const [rejectedWithdrawals, setRejectedWithdrawals] = useState([]);
    const navigate = useNavigate(); 

    // Fetch rejected withdrawals from the backend
    useEffect(() => {
        const fetchRejectedWithdrawals = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/users-withdraw-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRejectedWithdrawals(data.RejectedWithdrawals);
            } catch (error) {
                console.error('Error fetching rejected withdrawals:', error);
            }
        };

        fetchRejectedWithdrawals();
    }, []);

    const handleViewDetails = (withdrawalId) => {
        navigate(`/admin/withdrawals/${withdrawalId}`); // Navigate to the details page
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <h2>Rejected Withdrawals</h2>
                    <div className="rejected-withdrawals-container">
                        {rejectedWithdrawals.length === 0 ? (
                            <p>No rejected withdrawals at the moment.</p>
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
                                    {rejectedWithdrawals.map(withdrawal => (
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

export default RejectedWithdrawals;
