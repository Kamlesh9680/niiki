import React, { useState } from 'react';
import { FaChartLine, FaMoneyCheck, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Dasboard.css';

const Sidebar = ({ setFilterType }) => {
    const [withdrawalOpen, setWithdrawalOpen] = useState(false);
    const [depositOpen, setDepositOpen] = useState(false);
    const [manageUsersOpen, setManageUsersOpen] = useState(false);

    return (
        <div className="sidebar bg-customPurple">
            <div className="sidebar-logo">
                <img src="/logo2.png" alt="Logo" />
            </div>
            <div className="sidebar-nav-wrap">
                <nav>
                    <ul>
                        {/* Dashboard */}
                        <li>
                            <Link className="dropdown-header" to="/admin/dashboard">
                                <FaChartLine /> Dashboard
                            </Link>
                        </li>

                        {/* Deposits Dropdown */}
                        <li onClick={() => setDepositOpen(!depositOpen)}>
                            <div className="dropdown-header">
                                <FaMoneyCheck /> Deposits
                            </div>
                            {depositOpen && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/admin/deposits/pending">Pending Deposits</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/deposits/successful">Successful Deposits</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/deposits/rejected">Rejected Deposits</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/deposits/all">All Deposits</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Withdrawals Dropdown */}
                        <li onClick={() => setWithdrawalOpen(!withdrawalOpen)}>
                            <div className="dropdown-header">
                                <FaMoneyCheck /> Withdrawals
                            </div>
                            {withdrawalOpen && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/admin/withdrawals/pending">Pending Withdrawals</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/withdrawals/approved">Approved Withdrawals</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/withdrawals/rejected">Rejected Withdrawals</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/withdrawals/all">All Withdrawals</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Manage Users Dropdown */}
                        <li onClick={() => setManageUsersOpen(!manageUsersOpen)}>
                            <div className="dropdown-header">
                                <FaUser /> Manage Users
                            </div>
                            {manageUsersOpen && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/admin/users/active">Active Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/users/banned">Banned Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/users/all">All Users</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
