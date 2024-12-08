import React from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="relative flex justify-between items-center bg-white py-2 px-4 max-w-[480px] mx-auto shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center">
                <img
                    src="/logo2.png"
                    alt="Logo"
                    className="w-12 h-12"
                />
            </div>


            <div className="flex items-center space-x-4">

                <Link to="/wallet" className="flex items-center">
                    <img src="/coin.avif" alt="Gold Coin" className="w-8 h-8" />
                </Link>


                <Link to="/notifications" className="flex items-center">
                    <FaBell size={24} />
                </Link>
            </div>
        </header>
    );
};

export default Header;
