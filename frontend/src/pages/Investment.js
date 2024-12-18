import React from "react";
import "../style.css";
import "../reusable.css";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { FaChartPie, FaChartBar, FaLayerGroup, FaChartLine, FaRocket, FaClock, FaDollarSign } from "react-icons/fa";
import { GiFactory, GiReceiveMoney } from "react-icons/gi";
import BottomNav from '../components/BottomNav';

const Investment = () => {
    return (
        <div className="page-wrapper max-w-[480px] mx-auto">
            <div className="page-container">
                <div className="top-bg bg-gra-yellow-top"></div>

                <div className="my-portfolio mb-3">
                    <h4 className="fs-18 c-gray">My portfolio</h4>
                    <h1 className="fs-22">₹0</h1>
                </div>

                <div className="top-boxes flex item-stretch mb-5">
                    <div className="i-top-box w-1/2 py-3 px-3 mr-5">
                        <Link to="/mutual-fund">
                            <h4 className="fs-16 fw-400 mb-2 flex items-center gap-4">Mutual Fund <FaAngleRight /></h4>
                            <p className="fs-18 fw-500">Explore</p>
                        </Link>
                    </div>
                    <div className="i-top-box w-1/2 py-3 px-3">
                        <Link to="/digitalgold">
                            <h4 className="fs-16 fw-400 mb-2 flex items-center gap-4">Digital Gold <FaAngleRight /></h4>
                            <p className="fs-18 fw-500">Explore</p>
                        </Link>
                    </div>
                </div>

                <div className="top-funds mb-8">
                    <h2 className="fs-18 mb-3">Top funds for a balanced portfolio</h2>
                    <Link to="/comingsoon" className="top-fund-box py-3 px-4 mb-4 flex items-center justify-between">
                        <div className="top-f-txt">
                            <p className="fs-16 mb-2">Flexi Cap Fund</p>
                            <p className="fs-14 c-gray">Multi cap</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="top-f-no">
                                <p className="fs-16 fw-600 mb-2 c-green">+21.44%</p>
                                <p className="fs-14 c-gray">1Y returns</p>
                            </div>
                            <FaAngleRight />
                        </div>
                    </Link>
                    <Link to="/comingsoon" className="top-fund-box py-3 px-4 flex items-center justify-between">
                        <div className="top-f-txt">
                            <p className="fs-16 mb-2">Flexi Cap Fund</p>
                            <p className="fs-14 c-gray">Multi cap</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="top-f-no">
                                <p className="fs-16 fw-600 mb-2 c-green">+21.44%</p>
                                <p className="fs-14 c-gray">1Y returns</p>
                            </div>
                            <FaAngleRight />
                        </div>
                    </Link>
                </div>

                <div className="redemption w-100 flex flex-col item-center mb-8">
                    <p className="fs-14 mx-auto mb-4">FASTEST REDEMPTION</p>
                    <h4 className="fs-16 mb-2">
                        Get money next day by <span className="c-green">7:00 AM</span>
                    </h4>
                    <h4 className="fs-14 c-gray">if sell order is placed before 3 pm*</h4>
                </div>

                <FundCategory />
                <WhyInvest />
                <div className="bottom-bg bg-gra-yellow"></div>
            </div>
            <BottomNav />
        </div>
    );
};

const FundCategory = () => {
    const categories = [
        { name: "Large cap", icon: <FaChartPie /> },
        { name: "Mid cap", icon: <FaChartBar /> },
        { name: "Multi cap", icon: <FaLayerGroup /> },
        { name: "Index", icon: <FaChartLine /> },
        { name: "Industrial", icon: <GiFactory /> },
        { name: "Debt", icon: <GiReceiveMoney /> },
    ];

    return (
        <div className="fund-category mb-8">
            <h2 className="fs-18 mb-6">Fund categories</h2>
            <div className="fund-category-boxes flex flex-wrap mb-4">
                {categories.map((category, index) => (
                    <div key={index} className="fund-category-box w-1/3 mb-2 text-center flex flex-col items-center">
                        <div className="fund-cat-icon text-3xl mb-3">
                            {category.icon}
                        </div>
                        <p className="fs-16">{category.name}</p>
                    </div>
                ))}
            </div>
            <div className="fund-cat-btn bg-gray-200 px-3 py-2 flex item-center justify-center">
                <Link to="/comingsoon" className="fs-16">
                    Explore all funds
                </Link>
            </div>
        </div>
    );
};
const WhyInvest = () => {
    return (
        <div className="why-invest text-center">
            <h2 className="fs-20 c-gray mb-3">Why invest with Us?</h2>
            <div className="why-invest-boxes flex justify-center mb-5 gap-3">
                {[
                    { title: "Fastest", subtitle: "redemption", icon: <FaRocket /> },
                    { title: "3:00 PM", subtitle: "advantage", icon: <FaClock /> },
                    { title: "Zero", subtitle: "commission", icon: <FaDollarSign /> },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="why-invest-box  bg-white border border-yellow-100 rounded-sm w-1/4 py-4 px-3 flex flex-col items-center"
                    >
                        <div className="icon mb-3 text-2xl">{item.icon}</div>
                        <h2 className="fs-14">{item.title}</h2>
                        <p className="fs-14">{item.subtitle}</p>
                    </div>
                ))}
            </div>
            <p className="fs-16 c-gray">
                We provide top-tier financial security to ensure your money is safe!
            </p>
        </div>
    );
};
export default Investment;
