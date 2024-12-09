import React from "react";
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

const ComingSoon = () => {
    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-yellow-300 text-gray-800 px-3">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Coming Soon</h1>
                    <p className="text-lg md:text-2xl mb-6">
                        We're working hard to launch something amazing. Stay tuned!
                    </p>
                    
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default ComingSoon;
