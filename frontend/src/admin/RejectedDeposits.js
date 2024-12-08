import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import "./D-inner.css"


const RejectedDeposits = () => {
    const [rejectedDeposits, setRejectedDeposits] = useState([]);
    const navigate = useNavigate();

    // Fetch rejected deposits from the backend
    useEffect(() => {
        const fetchRejectedDeposits = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/users-deposit-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRejectedDeposits(data.RejectedDeposits);
            } catch (error) {
                console.error('Error fetching rejected deposits:', error);
            }
        };

        fetchRejectedDeposits();
    }, []);
    const handleViewDetails = (depositId) => {
        navigate(`/admin/deposits/${depositId}`); // Navigate to the details page
    };
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <div className="rejected-deposits-container">
                        <h2>Rejected Deposits</h2>
                        {rejectedDeposits.length === 0 ? (
                            <p>No rejected deposits at the moment.</p>
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
                                    {rejectedDeposits.map(deposit => (
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

export default RejectedDeposits;
