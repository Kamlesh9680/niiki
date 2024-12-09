import React from "react";
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

const NotificationsPage = () => {
    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <Header />
            <div className="page-container">
                <h1 className="text-2xl font-bold mb-4">Notifications</h1>
                <p>No new notifications.</p>                
            </div>
            <BottomNav />
        </div>
    );
};

export default NotificationsPage;
