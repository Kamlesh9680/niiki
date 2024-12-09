import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

Modal.setAppElement('#root');

const UserDetails = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [isIncreaseModalOpen, setIncreaseModalOpen] = useState(false);
    const [isDecreaseModalOpen, setDecreaseModalOpen] = useState(false);
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`/api/admin/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setUserDetails(data[0]);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                toast.error('Failed to fetch user details.'); // Notify on error
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleIncreaseBalance = async () => {
        try {
            const response = await fetch(`/api/admin/increase-balance/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(amount) }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Assuming the response JSON has both 'message' and 'userPayment'
            const { message, userPayment } = await response.json();
            
            if (message === 'User balance increased successfully') {
                console.log(userPayment); // Check the updated user payment details
                setUserDetails(userPayment); // Update the user details state with userPayment
                setIncreaseModalOpen(false);
                setAmount('');
                toast.success(message); // Notify on success
            } else {
                throw new Error('Unexpected response message');
            }
        } catch (error) {
            console.error('Error increasing user balance:', error);
            toast.error(error.message || 'Failed to increase user balance.'); // Notify on error with more detail
        }
    };
    

    const handleDecreaseBalance = async () => {
        try {
            const response = await fetch(`/api/admin/decrease-balance/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(amount) }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Assuming the response JSON has both 'message' and 'userPayment'
            const { message, userPayment } = await response.json();
            
            if (message === 'User balance decreased successfully') {
                console.log(userPayment);
                setUserDetails(userPayment);
                setDecreaseModalOpen(false);
                setAmount('');
                toast.success(message);
            } else {
                throw new Error('Unexpected response message');
            }
        } catch (error) {
            console.error('Error decreasing user balance:', error);
            toast.error(error.message || 'Failed to decrease user balance.'); 
        }
    };
    

    const handleBanUser = async () => {
        try {
            const response = await fetch(`/api/admin/ban-user/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'banned' }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            toast.success('User has been banned successfully!');
        } catch (error) {
            console.error('Error banning user:', error);
            toast.error('Failed to ban user.');
        }
    };

    const handleUnBanUser = async () => {
        try {
            const response = await fetch(`/api/admin/unban-user/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'active' }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            toast.success('User ban removed successfully!');
        } catch (error) {
            console.error('Error banning user:', error);
            toast.error('Failed to remove user ban.');
        }
    };


    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <ToastContainer />
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <h2>User Detail: {userDetails.email}</h2>
                    <div className="details-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Email:</th>
                                    <th>Username:</th>
                                    <th>Phone:</th>
                                    <th>User Balance:</th>
                                    <th>Status:</th>
                                    <th>Referrals:</th>
                                    <th>Date Joined:</th>
                                    <th>User Invite Code:</th>
                                    <th>User Password:</th>
                                    <th>User Invited From:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userDetails.userId}</td>
                                    <td>{userDetails.email}</td>
                                    <td>{userDetails.username}</td>
                                    <td>{userDetails.phone}</td>
                                    <td>{userDetails.balance}</td>
                                    <td>{userDetails.status}</td>
                                    <td>{userDetails.referrals?.length || 0}</td>
                                    <td>{new Date(userDetails.createdAt).toLocaleDateString()}</td>
                                    <td>{userDetails.inviteCode}</td>
                                    <td>{userDetails.password}</td>
                                    <td>{userDetails.invitedFrom}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Action Buttons */}
                    <div className="am-btn-wrap mt-50 flex items-center justify-around">
                        <button className='am-user-det-btn theme-btn' onClick={() => setIncreaseModalOpen(true)}>Increase User Balance</button>
                        <button className='am-user-det-btn theme-btn-border' onClick={() => setDecreaseModalOpen(true)}>Decrease User Balance</button>
                        <button className='am-user-det-btn theme-btn' onClick={handleBanUser}>Ban User</button>
                        <button className='am-user-det-btn theme-btn-border' onClick={handleUnBanUser}>Remove User Ban</button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isIncreaseModalOpen}
                onRequestClose={() => setIncreaseModalOpen(false)}
                style={{
                    content: {
                        maxWidth: '480px',
                        margin: 'auto',
                        padding: '0',
                        borderRadius: '12px',
                        height: 'fit-content',
                        border: 'none',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                }}
            >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h2 className="text-lg font-bold text-customPurple">Add User Balance</h2>
                        <button
                            onClick={() => setIncreaseModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700 text-xl"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="mt-4">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount USDT"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-customPurple"
                        />
                    </div>
                    <button
                        onClick={handleIncreaseBalance}
                        className="w-full mt-4 py-2 bg-customPurple text-white font-bold rounded-md hover:bg-purple-900 transition"
                    >
                        Submit
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={isDecreaseModalOpen}
                onRequestClose={() => setDecreaseModalOpen(false)}
                style={{
                    content: {
                        maxWidth: '480px',
                        margin: 'auto',
                        padding: '0',
                        borderRadius: '12px',
                        height: 'fit-content',
                        border: 'none',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                }}
            >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h2 className="text-lg font-bold text-red-500">Subtract User Balance</h2>
                        <button
                            onClick={() => setDecreaseModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700 text-xl"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="mt-4">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount USDT"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-red-500"
                        />
                    </div>
                    <button
                        onClick={handleDecreaseBalance}
                        className="w-full mt-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 transition"
                    >
                        Submit
                    </button>
                </div>
            </Modal>

        </div>
    );
};

export default UserDetails;
