import React from "react";
import "../style.css";
import "../reusable.css";
import { Link } from "react-router-dom";
import { FaFileAlt, FaMoneyBillWave, FaCalendarAlt, FaClipboard, FaPercent, FaLock } from "react-icons/fa";

const LoanPage = () => {
    const cashLoanBenefits = [
        { text: "100% paperless process", icon: <FaFileAlt /> },
        { text: "Instant transfer in 5 mins", icon: <FaMoneyBillWave /> },
        { text: "Choose your own EMI date", icon: <FaCalendarAlt /> },
        { text: "Minimal Documentation", icon: <FaClipboard /> },
        { text: "Attractive interest rates", icon: <FaPercent /> },
        { text: "No collateral required", icon: <FaLock /> },
    ];

    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            {/* Coming Soon Section */}
            <div className="page-container-two">
                <div className="l-coming-soon-box text-white py-5">
                    <div className="l-com-soon-txt">
                        <h2 className="fs-20 mb-5">Coming soon, stay tuned!</h2>
                        <p className="fs-16 mb-3">Our services will resume shortly</p>
                        <button className="theme-btn-white" onClick={() => alert("You will be notified! Thank you for your interest.")}>
                            Notify Me
                        </button>

                    </div>
                </div>

                {/* Loan Benefits Section */}
                <div className="page-container-inner">
                    <div className="loan-benefits mb-4">
                        <h2 className="fs-18 mb-3">Our cash loan benefits</h2>
                        <div className="loan-benefits-boxes flex item-stretch flex-wrap">
                            {cashLoanBenefits.map((benefit, index) => (
                                <Link to="/comingsoon"
                                    key={index}
                                    className="loan-benefit-box border rounded-sm py-3 px-2 flex flex-col items-center text-center"
                                >
                                    <div className="loan-benfit-icon text-2xl mb-3">
                                        {benefit.icon}
                                    </div>
                                    <div className="loan-benfit-txt">{benefit.text}</div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Cash Loan Details Section */}
                    <div className="loan-know-more mb-3">
                        <h2 className="fs-18 mb-3">For cash loan Our Finserv offers you</h2>
                        <div className="loan-know-more-box border rounded-sm">
                            <ul className="p-3 fs-14">
                                <li>Loan amount up to ₹10,00,000</li>
                                <li>Loan tenure up to 84 months</li>
                                <li>Interest rate up to 26%</li>
                            </ul>
                            <div className="loan-know-more-btn px-3 bg-pink-200 py-1">
                                <Link to="/comingsoon" className="fs-14 text-underline">
                                    Know more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Home Loan Coming Soon Section */}
                <div className="hl-coming-soon-box py-5 bg-yellow-200">
                    <div className="l-com-soon-txt">
                        <p className="fs-14 mb-1">HOME LOAN</p>
                        <h2 className="fs-20 mb-5">Coming soon, stay tuned!</h2>
                        <p className="fs-16 mb-3">Our services will resume shortly</p>
                        <button className="theme-btn-white" onClick={() => alert("You will be notified! Thank you for your interest.")}>
                            Notify Me
                        </button>
                    </div>
                </div>

                {/* Home Loan Details Section */}
                <div className="page-container-inner">
                    <div className="loan-know-more mb-3">
                        <h2 className="fs-18 mb-3">
                            For home loan Our Finserv offers you
                        </h2>
                        <div className="loan-know-more-box border rounded-sm">
                            <ul className="p-3 fs-14">
                                <li>Loan amount up to ₹2 Crore</li>
                                <li>Zero processing fee</li>
                                <li>Zero foreclosure charges</li>
                            </ul>
                            <div className="loan-know-more-btn px-2 bg-pink-200 py-1">
                                <Link to="/comingsoon" className="fs-14 text-underline">
                                    Know more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanPage;
