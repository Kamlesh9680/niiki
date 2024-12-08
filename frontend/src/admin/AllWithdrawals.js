import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import "./D-inner.css"

const AllWithdrawals = () => {
    const [allWithdrawals, setAllWithdrawals] = useState([]);
    const navigate = useNavigate(); 

    // Fetch all withdrawals from the backend
    useEffect(() => {
        const fetchAllWithdrawals = async () => {
            try {
                const response = await fetch('/api/admin/users-withdraw-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllWithdrawals(data.AllWithdrawals);
            } catch (error) {
                console.error('Error fetching all withdrawals:', error);
            }
        };

        fetchAllWithdrawals();
    }, []);

    // Function to handle viewing withdrawal details
    const handleViewDetails = (withdrawalId) => {
        navigate(`/admin/withdrawals/${withdrawalId}`); // Navigate to the details page
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <h2>All Withdrawals</h2>
                    <div className="all-withdrawals-container">
                        {allWithdrawals.length === 0 ? (
                            <p>No withdrawals at the moment.</p>
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
                                    {allWithdrawals.map(withdrawal => (
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

export default AllWithdrawals;
