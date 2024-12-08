import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import APrivateRoute from './components/APrivateRoute';
import PageWrapper from './App';
import LoanPage from './pages/loan';
import Investment from './pages/Investment';
import ProfilePage from './pages/Profile';
import ComingSoon from './pages/ComingSoon';
import DigitalGold from './components/DigitalGold';
import Register from './components/Register';
import Login from './components/Login';
import NotificationsPage from "./components/NotificationsPage";
import InvitePage from "./components/InvitePage";
import AddMoney from "./components/AddMoney";
import WalletPage from "./components/WalletPage";
import WithdrawalPage from "./components/WithdrawalPage";
import ReferralPage from "./components/ReferralPage";
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import PendingDeposits from './admin/PendingDeposits';
import SuccessfulDeposits from './admin/SuccessfulDeposits';
import RejectedDeposits from './admin/RejectedDeposits';
import AllDeposits from './admin/AllDeposits';
import DepositDetails from './admin/DepositDetails';
import PendingWithdrawals from './admin/PendingWithdrawals';
import RejectedWithdrawals from './admin/RejectedWithdrawals';
import ApprovedWithdrawals from './admin/ApprovedWithdrawals';
import AllWithdrawals from './admin/AllWithdrawals';
import WithdrawalDetails from './admin/WithdrawalDetails';
import ActiveUsers from './admin/ActiveUsers';
import BannedUsers from './admin/BannedUsers';
import AllUsers from './admin/AllUsers';
import UserDetails from './admin/UserDetails';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Outlet />
                <BottomNav />
              </>
            }
          >
            <Route index element={<PageWrapper />} />
            <Route path="loan" element={<LoanPage />} />
            <Route path="investment" element={<Investment />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="digitalgold" element={<DigitalGold />} />
            <Route path="comingsoon" element={<ComingSoon />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="invite" element={<InvitePage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="withdraw" element={<WithdrawalPage />} />
            <Route path="referral" element={<ReferralPage />} />
            <Route path="addmoney" element={<AddMoney />} />
          </Route>
        </Route>
        <Route element={<APrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/deposits/pending" element={<PendingDeposits />} />
          <Route path="/admin/deposits/successful" element={<SuccessfulDeposits />} />
          <Route path="/admin/deposits/rejected" element={<RejectedDeposits />} />
          <Route path="/admin/deposits/all" element={<AllDeposits />} />
          <Route path="/admin/deposits/:depositId" element={<DepositDetails />} />
          <Route path="/admin/withdrawals/pending" element={<PendingWithdrawals />} />
          <Route path="/admin/withdrawals/rejected" element={<RejectedWithdrawals />} />
          <Route path="/admin/withdrawals/approved" element={<ApprovedWithdrawals />} />
          <Route path="/admin/withdrawals/all" element={<AllWithdrawals />} />
          <Route path="/admin/withdrawals/:withdrawalId" element={<WithdrawalDetails />} />
          <Route path="/admin/users/active" element={<ActiveUsers />} />
          <Route path="/admin/users/banned" element={<BannedUsers />} />
          <Route path="/admin/users/all" element={<AllUsers />} />
          <Route path="/admin/users/:userId" element={<UserDetails />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
