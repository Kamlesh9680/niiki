import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import "./D-inner.css"

const AllDeposits = () => {
    const [allDeposits, setAllDeposits] = useState([]);
    const navigate = useNavigate();

    // Fetch all deposits from the backend
    useEffect(() => {
        const fetchAllDeposits = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/users-deposit-data'); // Adjust the API endpoint as necessary
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllDeposits(data.AllDeposits); // Assuming the response contains an allDeposits field
            } catch (error) {
                console.error('Error fetching all deposits:', error);
            }
        };

        fetchAllDeposits();
    }, []);
    const handleViewDetails = (depositId) => {
        navigate(`/admin/deposits/${depositId}`); // Navigate to the details page
    };
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                {/*<header className="dashboard-header">
                    <input type="text" placeholder="Search here..." className="search-bar" />
                    <div className="profile">
                        <span>admin</span>
                        <img src="https://via.placeholder.com/40" alt="admin avatar" className="avatar" />
                    </div>
                </header> */}
                <div className="dash-content-wrap">
                    <div className="all-deposits-container">
                        <h2>All Deposits</h2>
                        {allDeposits.length === 0 ? (
                            <p>No deposits available at the moment.</p>
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
                                    {allDeposits.map(deposit => (
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

export default AllDeposits;
