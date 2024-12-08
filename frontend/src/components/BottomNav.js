import React from 'react';
import { FaHome, FaMoneyBillWave, FaCreditCard, FaCog } from 'react-icons/fa'; // Importing React Icons
import { Link } from 'react-router-dom';

const BottomNav = () => {
    return (
        <div className="fixed bottom-0 left-1/2 bottom-nav transform -translate-x-1/2 bg-white shadow-[0px_-4px_6px_rgba(0,0,0,0.1)] w-full max-w-[480px]">
            <div className="w-full px-4 py-3">
                <div className="flex justify-around items-center">
                    <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-customPurple">
                        <FaHome size={24} />
                        <span className="text-sm mt-2">Home</span>
                    </Link>

                    <Link to="/investment" className="flex flex-col items-center text-gray-700 hover:text-customPurple">
                        <FaMoneyBillWave size={24} />
                        <span className="text-sm mt-2">Investment</span>
                    </Link>

                    <Link to="/loan" className="flex flex-col items-center text-gray-700 hover:text-customPurple">
                        <FaCreditCard size={24} />
                        <span className="text-sm mt-2">Loan</span>
                    </Link>

                    <Link to="/profile" className="flex flex-col items-center text-gray-700 hover:text-customPurple">
                        <FaCog size={24} />
                        <span className="text-sm mt-2">Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BottomNav;
