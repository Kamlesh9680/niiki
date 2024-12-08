import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import "./D-inner.css"


const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    // Fetch all users from the backend
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/users-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllUsers(data.allUsers); // Accessing only the all users list
            } catch (error) {
                console.error('Error fetching all users:', error);
            }
        };

        fetchAllUsers();
    }, []);
    const handleViewDetails = (userId) => {
        navigate(`/admin/users/${userId}`); // Navigate to the details page
    };
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <div className="all-users-container">
                        <h2>All Users</h2>
                        {allUsers.length === 0 ? (
                            <p>No users available at the moment.</p>
                        ) : (
                            <table className='custom-table'>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Date Joined</th>
                                        <th>Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.userId}</td>
                                            <td>{user.email}</td>
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

export default AllUsers;
