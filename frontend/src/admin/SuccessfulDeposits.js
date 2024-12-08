import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import "./D-inner.css"

const SuccessfulDeposits = () => {
    const [successfulDeposits, setSuccessfulDeposits] = useState([]);
    const navigate = useNavigate();

    // Fetch successful deposits from the backend
    useEffect(() => {
        const fetchSuccessfulDeposits = async () => {
            try {
                const response = await fetch('/api/admin/users-deposit-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSuccessfulDeposits(data.SuccessfulDeposits);
            } catch (error) {
                console.error('Error fetching successful deposits:', error);
            }
        };

        fetchSuccessfulDeposits();
    }, []);
    const handleViewDetails = (depositId) => {
        navigate(`/admin/deposits/${depositId}`); // Navigate to the details page
    };
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                
                <div className="dash-content-wrap">
                    <h2>Successful Deposits</h2>
                    <div className="successful-deposits-container">
                        {successfulDeposits.length === 0 ? (
                            <p>No successful deposits at the moment.</p>
                        ) : (
                            <table className='custom-table'>
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
                                    {successfulDeposits.map(deposit => (
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

export default SuccessfulDeposits;
