import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaUserFriends, FaQrcode, FaAngleRight, FaBell, FaSignOutAlt, FaPhone  } from "react-icons/fa";
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

const ProfilePage = () => {
    // Mock user data (Replace with actual fetched data)
    const [user, setUser] = useState({ username: "", userId: "" });
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch user data from local storage
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("user");
            navigate("/login");
        }
    };
    const options = [
        {
            name: "Wallet",
            icon: <FaWallet className="text-2xl" />,
            action: () => navigate("/wallet"),
        },
        {
            name: "Referral Data",
            icon: <FaUserFriends className="text-2xl" />,
            action: () => navigate("/referral"),
        },
        {
            name: "Refer and Earn",
            icon: <FaQrcode className="text-2xl" />,
            action: () => navigate("/invite"),
        },
        {
            name: "Notifications",
            icon: <FaBell className="text-2xl" />,
            action: () => navigate("/notifications"),
        },
        {
            name: "Contact",
            icon: <FaPhone className="text-2xl" />,
            action: () => navigate("/contact"),
        },
    ];

    return (
        <div className="relative page-wrapper max-w-[480px] mx-auto z-0">
            <Header />
                <div className="top-bg bg-gra-yellow-top"></div>
            <div className="page-container">
                <div className="flex items-center gap-6 py-6 px-4 rounded-md shadow-md">
                    <div className="user-img w-16">
                        <img src="/user.png" className="rounded-full" alt='userimg' />
                    </div>
                    <div className="user-txt">
                        <h3 className="text-xl font-semibold">{user.phone || "Guest"}</h3>
                        <p className="mt-1 text-sm">
                            User ID: {user.id || "Not Available"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 mt-6 mb-10">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={option.action}
                            className="bg-white relative p-4 flex items-center gap-4 border border-purple-200 rounded-md shadow-md cursor-pointer hover:bg-customPurple hover:text-white transition duration-200"
                        >
                            {option.icon}
                            <span className="font-large">{option.name}</span>
                            <FaAngleRight className="text-xl absolute right-4" />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLogout}
                        className="theme-btn w-full transition duration-200"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                    </button>
                </div>

                {/* <Link to='/terms-conditions'></Link> */}

            </div>
            <BottomNav />
        </div>
    );
};

export default ProfilePage;
