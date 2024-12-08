
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import "./D-inner.css"


const PendingDeposits = () => {
    const [pendingDeposits, setPendingDeposits] = useState([]);
    const navigate = useNavigate();

    // Fetch pending deposits from the backend
    useEffect(() => {
        const fetchPendingDeposits = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/users-deposit-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPendingDeposits(data.PendingDeposits);
            } catch (error) {
                console.error('Error fetching pending deposits:', error);
            }
        };

        fetchPendingDeposits();
    }, []);

    const handleViewDetails = (depositId) => {
        navigate(`/admin/deposits/${depositId}`, {
            state: { fromPendingPage: true }, 
        });
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <h2>Pending Deposits</h2>
                    <div className="pending-deposits-container">
                        {pendingDeposits.length === 0 ? (
                            <p>No pending deposits at the moment.</p>
                        ) : (
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Transaction Id</th>
                                        <th>User Id</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingDeposits.map(deposit => (
                                        <tr key={deposit.id}>
                                            <td>{deposit.transactionId}</td>
                                            <td>{deposit.userId}</td>
                                            <td>{deposit.amount}</td>
                                            <td>{deposit.status}</td>
                                            <td>{new Date(deposit.date).toLocaleDateString()}</td>
                                            <td>
                                                <button className="table-detail-btn" onClick={() => handleViewDetails(deposit.transactionId)}>
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

export default PendingDeposits;
