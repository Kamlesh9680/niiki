import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import "./D-inner.css"

const ApprovedWithdrawals = () => {
    const [approvedWithdrawals, setApprovedWithdrawals] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchApprovedWithdrawals = async () => {
            try {
                const response = await fetch('/api/admin/users-withdraw-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setApprovedWithdrawals(data.SuccessfulWithdrawals);
            } catch (error) {
                console.error('Error fetching approved withdrawals:', error);
            }
        };

        fetchApprovedWithdrawals();
    }, []);

     const handleViewDetails = (withdrawalId) => {
        navigate(`/admin/withdrawals/${withdrawalId}`); 
    };
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <h2>Approved Withdrawals</h2>
                    <div className="approved-withdrawals-container">
                        {approvedWithdrawals.length === 0 ? (
                            <p>No approved withdrawals at the moment.</p>
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
                                    {approvedWithdrawals.map(withdrawal => (
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

export default ApprovedWithdrawals;
