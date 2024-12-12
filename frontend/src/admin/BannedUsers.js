import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import "./D-inner.css"


const BannedUsers = () => {
    const [bannedUsers, setBannedUsers] = useState([]);
    const navigate = useNavigate();

    // Fetch banned users from the backend
    useEffect(() => {
        const fetchBannedUsers = async () => {
            try {
                const response = await fetch('/api/admin/users-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBannedUsers(data.bannedUsers);
            } catch (error) {
                console.error('Error fetching banned users:', error);
            }
        };

        fetchBannedUsers();
    }, []);
    const handleViewDetails = (userId) => {
        navigate(`/admin/users/${userId}`); // Navigate to the details page
    };
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <h2>Banned Users</h2>
                    <div className="banned-users-container">
                        {bannedUsers.length === 0 ? (
                            <p>No banned users at the moment.</p>
                        ) : (
                            <table className='custom-table'>
                                <thead>
                                    <tr>
                                    <th>User ID</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Date Joined</th>
                                        <th>Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bannedUsers.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.userId}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.status}</td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button className="table-detail-btn" onClick={() => handleViewDetails(user.userId)}>
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

export default BannedUsers;
