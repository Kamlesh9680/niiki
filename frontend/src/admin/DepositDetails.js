import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Modal from 'react-modal';
import { toast } from "react-toastify";

Modal.setAppElement('#root');

const DepositDetails = () => {
    const { depositId } = useParams();
    const location = useLocation();
    const [depositDetails, setDepositDetails] = useState(null);
    const [isFromPendingPage, setIsFromPendingPage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

        if (location.state && location.state.fromPendingPage) {
            setIsFromPendingPage(true);
        }

        const fetchDepositDetails = async () => {
            try {
                const response = await fetch(`/api/admin/deposits/${depositId}`); // Adjust API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                if (Array.isArray(data) && data.length > 0) {
                    setDepositDetails(data[0]);
                }
                console.log(data)
            } catch (error) {
                console.error('Error fetching deposit details:', error);
            }
        };

        fetchDepositDetails();

    }, [depositId, location]);

    const handleApprove = async () => {
        try {
            const response = await fetch(`/api/admin/deposits/approve/${depositId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: depositDetails.amount,
                    userId: depositDetails.userId
                })
            });
            if (response.ok) {
                setDepositDetails((prevDetails) => ({
                    ...prevDetails,
                    status: 'success'
                }));
                toast.success('Deposit approved');
            } else {
                toast.error('Failed to approve deposit');
            }
        } catch (error) {
            console.error('Error approving deposit:', error);
            toast.error('Error approving deposit');
        }
    };

    const handleDecline = async () => {
        try {
            const response = await fetch(`/api/admin/deposits/decline/${depositId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setDepositDetails((prevDetails) => ({
                    ...prevDetails,
                    status: 'rejected'
                }));
                toast.success('Deposit declined');
            } else {
                toast.error('Failed to decline deposit');
            }
        } catch (error) {
            console.error('Error declining deposit:', error);
            toast.error('Error declining deposit');
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!depositDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap deposit-details text-center ">
                    <h2>Deposit Details</h2>
                    <div className="details-table flex items-center justify-around">
                        <table >
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>User Email</th>
                                    <th>Transaction ID</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date Requested</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{depositDetails.userId}</td>
                                    <td>{depositDetails.userEmail}</td>
                                    <td>{depositDetails.transactionId}</td>
                                    <td>{depositDetails.amount}</td>
                                    <td>{depositDetails.status}</td>
                                    <td>{new Date(depositDetails.createdAt).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='dt-py-screenshot'>
                            <p>Deposit Screenshot</p>
                            {depositDetails.screenshot ? (
                                <img
                                    src={`http://127.0.0.1:5000/${depositDetails.screenshot}`}
                                    alt="Deposit Screenshot"
                                    style={{ width: '220px', height: 'auto', marginTop: '10px' }}
                                    onClick={openModal}
                                />
                            ) : (
                                'No screenshot available'
                            )}
                        </div>
                    </div>
                    {isFromPendingPage && (
                        <div className="dt-action-buttons">
                            <button className='am-user-det-btn theme-btn' onClick={handleApprove} disabled={depositDetails.status === 'success'}>
                                Approve Deposit
                            </button>
                            <button className='am-user-det-btn theme-btn-border' onClick={handleDecline} disabled={depositDetails.status === 'rejected'}>
                                Decline Deposit
                            </button>
                        </div>
                    )}
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={{
                        content: {
                            width: '70%',
                            maxWidth: '700px',
                            height: 'auto',
                            margin: 'auto',
                            borderRadius: '8px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                    }}
                >
                    <h2>Deposit Screenshot</h2>
                    <img
                        src={`http://127.0.0.1:5000/${depositDetails.screenshot}`}
                        alt="Full Deposit Screenshot"
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <button className='theme-btn-border am-modal-btn' onClick={closeModal} style={{ marginTop: '10px', width: "30%" }}>Close</button>
                </Modal>
            </div>
        </div>
    );
};

export default DepositDetails;
