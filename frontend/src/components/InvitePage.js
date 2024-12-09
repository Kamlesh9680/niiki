import React from "react";
import { toast } from "react-toastify";
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

const InvitePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const inviteCode = user?.inviteCode; 
    const inviteLink = `https://example.com/register?inviteCode=${inviteCode}`; 

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink);
        toast.success("Invite link copied to clipboard!");
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Join My Site",
                    text: `Join my site using my invite code: ${inviteCode}`,
                    url: inviteLink,
                });
            } catch (error) {
                console.error("Error sharing:", error);
                toast.error("Failed to share the invite link.");
            }
        } else {
            toast.info("Sharing is not supported on this browser. Please copy the link manually.");
        }
    };

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <Header />
            <div className="page-container">
                <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
                    <h1 className="text-xl font-bold text-center mb-4">Invite Friends</h1>

                    {inviteCode ? (
                        <>
                            <div className="text-center mb-4">
                                <p className="font-medium">Your Invite Code:</p>
                                <p className="text-lg font-bold text-customPurple">{inviteCode}</p>
                            </div>

                            <div className="text-center mb-4">
                                <p className="text-lg">Invite Link:</p>
                                <p className="text-md text-gray-700 break-words">{inviteLink}</p>
                            </div>

                            <div className="flex justify-center space-x-4 mt-4">
                                <button
                                    onClick={handleCopy}
                                    className="px-4 py-2 theme-btn-border text-white font-bold rounded "
                                >
                                    Copy Link
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="px-4 py-2 theme-btn text-white font-bold rounded "
                                >
                                    Share Link
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-red-500">Invite code not available. Please log in.</p>
                    )}
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default InvitePage;
