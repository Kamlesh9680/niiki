import React from 'react';

const firstDeposit = () => {
    return (
        <div className="page-wrapper max-w-[480px] mx-auto flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Complete Your First Deposit</h1>
            <p className="mb-6 text-center">
                Please deposit ₹10 or more to unlock the full application features.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Proceed to Deposit
            </button>
        </div>
    );
};

export default firstDeposit;
