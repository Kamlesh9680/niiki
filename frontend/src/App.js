import React, { useEffect, useState } from "react";
import "./style.css";
import "./reusable.css";
import { FaMobileAlt, FaUniversity, FaHistory, FaWallet, FaBolt, FaEllipsisH, FaCreditCard, FaHeartbeat, FaCoins, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const PageWrapper = () => {
  const navigate = useNavigate();
  const [firstDepositCompleted, setFirstDepositCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDepositStatus = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const response = await axios.get(`/api/user/deposit-status/${user.id}`);
          const isDepositCompleted = response.data.firstDepositCompleted;
          setFirstDepositCompleted(isDepositCompleted);
          setShowModal(!isDepositCompleted);
        }
      } catch (error) {
        console.error("Error checking deposit status:", error);
      }
    };

    fetchDepositStatus();
  }, []);

  return (
    <div className="page-wrapper max-w-[480px] mx-auto">
      <PageContainer />
      <Modal
        isOpen={showModal}
        contentLabel="Complete First Deposit"
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Complete Your First Deposit</h2>
          <p className="text-gray-700 mb-2 text-center">You need to complete your first deposit of ₹10 to proceed further in the app.</p>
          <p className="text-green-600 font-semibold mb-4 text-center">Earn ₹50/referral</p>
          <button
            className="theme-btn-border"
            onClick={() => {
              navigate("/addmoney?fromModal=true");
            }}
          >
            Go to First Deposit
          </button>
        </div>
      </Modal>

    </div>
  );
};

const PageContainer = () => {
  return (
    <div className="page-container">
      <FirstCoinOffer />
      <TopButtons />
      <ThemeButtonWrap />
      <DigitalGoldBox />
      <BillPayments />
      <ExploreOptions />
      <Investments />
    </div>
  );
};

const FirstCoinOffer = () => (
  <div className="first-coin-offer text-center mb-6">
    <h2 className="c-purple">Get flat 10 (₹10)</h2>
    <p className="c-purple">in your first UPI payment</p>
  </div>
);

const TopButtons = () => {
  const buttonData = [
    { text: "Pay mobile number", icon: <FaMobileAlt size={24} /> },
    { text: "Pay to UPI ID or bank", icon: <FaUniversity size={24} /> },
    { text: "Transaction History", icon: <FaHistory size={24} /> },
    { text: "Check Balance", icon: <FaWallet size={24} /> },
  ];

  return (
    <div className="top-buttons mb-4">
      {buttonData.map((button, index) => (
        <Link to="/comingsoon" className="item-center-col" key={index}>
          <div className="top-btn-icon mb-2 item-center">{button.icon}</div>
          {button.text}
        </Link>
      ))}
    </div>
  );
};

const ThemeButtonWrap = () => {
  const navigate = useNavigate();

  return (
    <div className="theme-btn-wrap mb-8 flex">
      <button
        className="theme-btn-border w-1/2"
        onClick={() => navigate("/comingsoon")}
      >
        Add Money
      </button>
      <button
        className="theme-btn w-1/2"
        onClick={() => navigate("/comingsoon")}
      >
        Scan & Pay
      </button>
    </div>
  );
};

const DigitalGoldBox = () => (
  <Link to="/digitalgold">
    <div className="relative digital-gold-box flex items-center justify-between bg-yellow-100 border-[yellow] rounded-md p-3 mb-5 pl-6">
      <div>
        <h2 className="fs-20 mb-2">Digital Gold</h2>
        <p className="fs-14 c-gray">Refer and earn ₹50/referral</p>
      </div>
      <div>
        <img src="/coin.png" className="w-20" alt="coin" />
      </div>
      <span className="bg-customPurple text-white rounded-full px-4 py-1 absolute -top-4 left-40">Available Now</span>
    </div >
  </Link>
);

const BillPayments = () => {
  const billPaymentData = [
    { text: "Mobile recharge", icon: <FaMobileAlt size={24} /> },
    { text: "Electricity", icon: <FaBolt size={24} /> },
    { text: "Credit card", icon: <FaCreditCard size={24} /> },
    { text: "More", icon: <FaEllipsisH size={24} /> },
  ];

  return (
    <div className="bill-payments mb-5">
      <div className="bill-pay-top flex items-center justify-between mb-1">
        <h2 className="fs-18">Bill Payments</h2>
        <p className="c-gray fs-14">₹ 0 PLATFORM FEE</p>
      </div>
      <div className="bill-pay-boxes border rounded-md pt-3">
        <div className="bill-pay-boxes-wrap flex items-center justify-between px-3">
          {billPaymentData.map((item, index) => (
            <Link className="bill-pay-box item-center-col" to="/comingsoon" key={index}>
              <div className="bill-pay-icon mb-2">{item.icon}</div>
              {item.text}
            </Link>
          ))}
        </div>
        <div className="bill-pay-bottom text-center bg-gray-200 mt-3 py-1">
          <p className="fs-14">Win upto 1000 on bill payments with Our UPI</p>
        </div>
      </div>
    </div>
  );
};

const ExploreOptions = () => {
  const exploreData = [
    { text: "Health Insurance", icon: <FaHeartbeat size={24} /> },
    { text: "Digital Gold", icon: <FaCoins size={24} /> },
    { text: "Mutual Fund", icon: <FaChartLine size={24} /> },
    { text: "Cash loan", icon: <FaMoneyBillWave size={24} /> },
  ];

  return (
    <div className="explore-options mb-5">
      <h2 className="fs-18 mb-3">Explore App</h2>
      <div className="explore-boxes flex items-center text-center">
        {exploreData.map((item, index) => (
          <Link to="/comingsoon" className="explore-box w-1/4 border rounded-md py-2" key={index}>
            <p>
              {item.text.split(" ")[0]} <br /> {item.text.split(" ")[1]}
            </p>
            <div className="explore-icon mb-2 mt-3 item-center">{item.icon}</div> {/* Render icon */}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Investments = () => (
  <div className="investments">
    <h2 className="fs-18 mb-2">My investments</h2>
    <Link
      to="/comingsoon"
      className="invest-home-box py-2 px-3 bg-gray-200 rounded-md mb-4"
      style={{ display: "block" }}
    >
      ₹0
    </Link>
    <div className="mutual-home-box rounded-md border">
      <div className="mutual-hometxt flex items-center justify-between px-3 pt-3">
        <div className="mb-4">
          <h4 className="fs-14">MUTUAL FUND</h4>
          <h4 className="fs-18 fw-600">
            Invest <span className="c-purple">regularly</span>
          </h4>
          <h4 className="fs-14">Nifty 50 Index Fund</h4>
        </div>
        <button className="theme-btn">Setup SIP</button>
      </div>
      <div className="text-center bg-yellow-200 py-2">
        <p className="fs-14">Invest with our 800k+ user base</p>
      </div>
    </div>
  </div>
);

export default PageWrapper;
