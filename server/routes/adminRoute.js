const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Deposit = require('../models/Deposit');
const Withdraw = require("../models/Withdraw");
const User = require("../models/User");
const Notification = require("../models/Notification");

const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;

// Admin Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Generate a JWT Token
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.get('/user-stats', async (req, res) => {
    try {
        // User statistics
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });
        const totalDeposited = await Deposit.countDocuments({ status: 'pending' });
        const totalWithdrawal = await Withdraw.countDocuments({ status: 'pending' });


        const stats = {
            totalUsers,
            activeUsers,
            totalDeposited,
            totalWithdrawal,
        };

        return res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/users-deposit-data', async (req, res) => {
    try {
        const PendingDeposits = await Deposit.find({ status: 'pending' });
        const SuccessfulDeposits = await Deposit.find({ status: 'success' });
        const RejectedDeposits = await Deposit.find({ status: 'rejected' });
        const AllDeposits = await Deposit.find();

        // Return the filtered users in a structured response
        res.json({
            PendingDeposits,
            SuccessfulDeposits,
            RejectedDeposits,
            AllDeposits,
        });
    } catch (error) {
        console.error('Error fetching Deposit:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/deposits/:depositId', async (req, res) => {
    const { depositId } = req.params;

    try {
        
        const deposit = await Deposit.find({ trackId: depositId });

        if (!deposit) {
            return res.status(404).json({ message: 'Deposit not found' });
        }

        // Send the withdrawal data as response
        res.json(deposit);
    } catch (error) {
        console.error('Error fetching withdrawal details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const isFirstDeposit = async (userId) => {
    try {
        // Check if the user has any successful deposits
        const depositCount = await Deposit.countDocuments({ userId });
        return depositCount === 0;
    } catch (error) {
        throw new Error('Error checking user deposit history');
    }
};



router.post('/deposits/approve/:depositId', async (req, res) => {
    const { depositId } = req.params;
    const { amount, userId } = req.body;

    try {
        // Check if the user has completed their first deposit
        const firstDeposit = await isFirstDeposit(userId);
        

        // Update deposit status
        const updatedDeposit = await Deposit.findOneAndUpdate(
            { trackId: depositId },
            { status: 'success', dateProcessed: new Date() },
            { new: true }
        );

        if (!updatedDeposit) {
            return res.status(404).send({ error: 'Deposit not found' });
        }

        // Update user balance
        const user = await User.findOneAndUpdate(
            { userId },
            {
                $inc: { balance: amount },
                $set: { firstDepositCompleted: true }
            },
            { new: true }
        );


        if (firstDeposit) {

            const inviter = await User.findOne({ inviteCode: user.invitedFrom });
            if (inviter) {
                await User.findOneAndUpdate(
                    { inviteCode: user.invitedFrom },
                    { $inc: { balance: 50 } }
                );
            } else {
                console.error("Inviter not found");
            }
        } else {
            console.log("Deposit already exists for this user.");
        }

        const notification = new Notification({
            userId: updatedDeposit.userId,
            message: `Your deposit has been Approved.\nTransaction ID: ${updatedDeposit.transactionId}\nAmount: INR ${updatedDeposit.amount}`,
            timestamp: new Date(),
            type: 'Deposit Approve',
            isRead: false
        });

        await notification.save();

        res.status(200).send({ message: 'Deposit approved and balances updated' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error approving deposit' });
    }
});

router.post('/add-balance', async (req, res) => {
    const { amount, userId } = req.body;

    try {
        
        const firstDeposit = await isFirstDeposit(userId);

        const newDeposit = new Deposit({
            userId,
            amount,
        });

        // Update user balance
        const user = await User.findOneAndUpdate(
            { userId },
            {
                $inc: { balance: amount },
                $set: { firstDepositCompleted: true }
            },
            { new: true }
        );


        if (firstDeposit) {

            const inviter = await User.findOne({ inviteCode: user.invitedFrom });
            if (inviter) {
                await User.findOneAndUpdate(
                    { inviteCode: user.invitedFrom },
                    { $inc: { balance: 50 } }
                );
            } else {
                console.error("Inviter not found");
            }
        } else {
            console.log("Deposit already exists for this user.");
        }

        const notification = new Notification({
            userId: updatedDeposit.userId,
            message: `Your deposit has been Approved.\nAmount: INR ${amount}`,
            timestamp: new Date(),
            type: 'Deposit Approve',
            isRead: false
        });

        await notification.save();

        res.status(200).send({ message: 'Deposit approved and balances updated' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error approving deposit' });
    }
});

// Decline deposit
router.post('/deposits/decline/:depositId', async (req, res) => {
    const { depositId } = req.params;

    try {
        const deposit = await Deposit.findOneAndUpdate(
            { trackId: depositId },
            { status: 'rejected', dateProcessed: new Date() },
            { new: true }
        );

        if (!deposit) {
            return res.status(404).send({ error: 'Deposit not found' });
        }

        const notification = new Notification({
            userId: deposit.userId,
            message: `Your deposit has been declined.\nTransaction ID: ${deposit.transactionId}\nAmount: INR ${deposit.amount}`,
            timestamp: new Date(),
            type: 'Deposit Decline',
            isRead: false
        });

        await notification.save();

        res.status(200).send({ message: 'Deposit declined and notification sent' });
    } catch (error) {
        res.status(500).send({ error: 'Error declining deposit' });
    }
});


router.get('/users-withdraw-data', async (req, res) => {
    try {
        const PendingWithdrawals = await Withdraw.find({ status: 'pending' });
        const SuccessfulWithdrawals = await Withdraw.find({ status: 'success' });
        const RejectedWithdrawals = await Withdraw.find({ status: 'rejected' });
        const AllWithdrawals = await Withdraw.find();

        // Return the filtered users in a structured response
        res.json({
            PendingWithdrawals,
            SuccessfulWithdrawals,
            RejectedWithdrawals,
            AllWithdrawals,
        });
    } catch (error) {
        console.error('Error fetching Deposit:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/withdrawals/:withdrawalId', async (req, res) => {
    const { withdrawalId } = req.params;

    try {
        // Fetch withdrawal by ID
        const withdrawal = await Withdraw.find({ transactionId: withdrawalId });

        if (!withdrawal) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }

        // Send the withdrawal data as response
        res.json(withdrawal);
    } catch (error) {
        console.error('Error fetching withdrawal details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve withdrawal and deduct earnings
router.post('/withdraw/deduct/:withdrawalId/', async (req, res) => {
    const { withdrawalId } = req.params;

    try {
        const withdrawal = await Withdraw.findOne({ transactionId: withdrawalId });
        if (!withdrawal) {
            return res.status(404).json({ error: 'Withdrawal not found' });
        }

        if (withdrawal.status === 'success') {
            return res.status(400).json({ error: 'Withdrawal already approved' });
        }

        withdrawal.status = 'success';
        await withdrawal.save();

        const notification = new Notification({
            userId: withdrawal.userId,
            message: `Your deposit has been Approved.\nAmount: INR ${withdrawal.amount}`,
            timestamp: new Date(),
            type: 'Withdrawal Approved',
            isRead: false
        });

        await notification.save();

        return res.status(200).json({ message: 'Withdrawal approved successfully', withdrawal });
    } catch (error) {
        console.error('Error approving withdrawal:', error);
        return res.status(500).json({ error: 'Server error approving withdrawal' });
    }
});

// Decline withdrawal and deduct earnings
router.post('/withdrawals/decline/:withdrawalId', async (req, res) => {
    const { withdrawalId } = req.params;

    try {
        const withdrawal = await Withdraw.findOne({ transactionId: withdrawalId });

        if (!withdrawal) {
            return res.status(404).json({ error: 'Withdrawal not found' });
        }

        if (withdrawal.status === 'success') {
            return res.status(400).json({ error: 'Withdrawal already processed' });
        }

        if (withdrawal.status === 'rejected') {
            return res.status(400).json({ error: 'Withdrawal already declined' });
        }

        const user = await User.findOne({ userId: withdrawal.userId });

        if (user) {
            user.balance += withdrawal.amount;
            await user.save(); 
        } else {
            console.log('User not found');
        }

        withdrawal.status = 'rejected';
        await withdrawal.save();

        const notification = new Notification({
            userId: withdrawal.userId,
            message: `Your withdrawal has been declined.\nAmount: INR ${withdrawal.amount}`,
            timestamp: new Date(),
            type: 'Withdrawal Decline',
            isRead: false
        });

        await notification.save();

        return res.status(200).json({ message: 'Withdrawal rejected successfully', withdrawal });
    } catch (error) {
        console.error('Error declining withdrawal:', error);
        return res.status(500).json({ error: 'Server error declining withdrawal' });
    }
});

router.get('/users-data', async (req, res) => {
    try {
        const activeUsers = await User.find({ status: 'active' });
        const bannedUsers = await User.find({ status: 'banned' });
        const allUsers = await User.find();

        // Return the filtered users in a structured response
        res.json({
            activeUsers,
            bannedUsers,
            allUsers,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.find({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching withdrawal details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/increase-balance/:userId', async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    try {
        const userPayment = await User.findOne({ userId });

        if (!userPayment) {
            return res.status(404).json({ message: 'User payment record not found' });
        }

        userPayment.balance += Number(amount);
        await userPayment.save();


        return res.status(200).json({ message: 'User balance increased successfully', userPayment });
    } catch (error) {
        console.error('Error increasing balance:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Decrease User Balance
router.post('/decrease-balance/:userId', async (req, res) => {
    const { userId } = req.params;
    const { amount, remarks } = req.body;

    try {
        const userPayment = await User.findOne({ userId });

        if (!userPayment) {
            return res.status(404).json({ message: 'User payment record not found' });
        }

        if (userPayment.balance === 0) {
            return res.status(400).json({ message: "User's memberpoint balance is 0" });
        }

        if (userPayment.balance < Number(amount)) {
            return res.status(400).json({ message: "Insufficient memberpoint balance" });
        }

        // Update memberpoint
        userPayment.balance -= Number(amount);
        await userPayment.save();

        // Optionally, log remarks or perform additional actions

        return res.status(200).json({ message: 'User balance decreased successfully', userPayment });
    } catch (error) {
        console.error('Error decreasing balance:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Ban User
router.put('/ban-user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Update the user's status in the user collection
        const user = await User.findOne({ userId: userId }); // Use userId directly

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = 'banned'; // Update the status to banned
        await user.save();

        return res.status(200).json({ message: 'User banned successfully', user });
    } catch (error) {
        console.error('Error banning user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.put('/unban-user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = 'active'; // Update the status to banned
        await user.save();

        return res.status(200).json({ message: 'User Unbanned successfully', user });
    } catch (error) {
        console.error('Error banning user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
