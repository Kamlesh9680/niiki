import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaUserCheck, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './Dasboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalDeposited: 0,
        totalWithdrawal: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/user-stats');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStats({
                    totalUsers: data.totalUsers,
                    activeUsers: data.activeUsers,
                    totalDeposited: data.totalDeposited || 0,
                    totalWithdrawal: data.totalWithdrawal || 0,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dash-content-wrap">
                    <div className="stats-cards">
                        <Link to="/admin/users/all" className="card total-users">
                            <FaUserFriends className="icon" />
                            <div className="stats-cards-inner">
                                <h3>Total Users</h3>
                                <p>{stats.totalUsers}</p>
                            </div>
                        </Link>
                        <Link to="/admin/users/active" className="card active-users">
                            <FaUserCheck className="icon" />
                            <div className="stats-cards-inner">
                                <h3>Active Users</h3>
                                <p>{stats.activeUsers}</p>
                            </div>
                        </Link>
                    </div>
                    <div className="stats-cards2">
                        <div className="card total-deposited">
                            <FaMoneyBillWave className="icon" />
                            <div className="stats-cards-inner">
                                <h3>Deposit Requets</h3>
                                <p>{stats.totalDeposited}</p>
                            </div>
                            <Link to="/admin/deposits/all" className="view-all">View All</Link>
                        </div>
                        <div className="card rejected-deposits">
                            <FaClock className="icon" />
                            <div className="stats-cards-inner">
                                <h3>Withdraw Requets </h3>
                                <p>{stats.totalWithdrawal}</p>
                            </div>
                            <Link to="/admin/deposits/rejected" className="view-all">View All</Link>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
