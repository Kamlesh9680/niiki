import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;
            if (!user || !user.id) {
                setError('User not logged in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/api/notifications/${userId}`);
                setNotifications(response.data);
            } catch (err) {
                setError('Failed to fetch notifications.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <Header />
            <div className="page-container">
                <h1 className="text-2xl font-bold mb-4">Notifications</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : notifications.length === 0 ? (
                    <p>No new notifications.</p>
                ) : (
                    <ul className="notification-list">
                        {notifications.map((notification) => (
                            <li key={notification._id} className="mb-2 border-b pb-2">
                                <p dangerouslySetInnerHTML={{ __html: notification.message.replace(/\n/g, '<br />') }} />
                                <span className="text-sm text-gray-500">
                                    {new Date(notification.timestamp).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>

                )}
            </div>
            <BottomNav />
        </div>
    );
};

export default NotificationsPage;
