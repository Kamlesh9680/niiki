const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit'); 
const User = require("../models/User");
const Withdraw = require("../models/Withdraw");
const multer = require('multer');
const path = require('path');

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token." });
    }
};

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
});

const generateTransactionId = () => {
    const timestamp = Date.now().toString(); // Current timestamp in milliseconds
    const randomPart = Math.floor(Math.random() * 900000) + 100000; // Generate a random 6-digit number
    return `${timestamp.slice(-4)}${randomPart}`; // Combine parts to ensure uniqueness
};

const checkDepositRecord = async (userId) => {
    try {
        const depositCount = await Deposit.countDocuments({ userId, status: 'pending', amount: 10 });
        return depositCount;
    } catch (error) {
        throw new Error('Error checking user deposit history');
    }
};

// Route to handle deposit request
router.post('/deposit-request', upload.single('screenshot'), async (req, res) => {
    const { userId, amount, transactionId, status, createdAt } = req.body;

    const firstPendingDeposit = await checkDepositRecord(userId);
    console.log(firstPendingDeposit);

    if(firstPendingDeposit === 1){
        return res.status(400).send({ success: false, message: 'First deposit request already submitted' });
    }

    const screenshotPath = req.file ? req.file.path : null; 
    if (!screenshotPath) {
        return res.status(400).json({ success: false, message: 'Screenshot is required' });
    }

    try {
        const itxid = generateTransactionId();

        const newDeposit = new Deposit({
            userId,
            amount,
            screenshot: screenshotPath,
            transactionId,
            trackId: itxid,
            status,
            createdAt
        });

        await newDeposit.save();
        res.json({ success: true, message: 'Deposit request saved successfully.' });
    } catch (error) {
        console.error('Error saving deposit:', error);
        res.status(500).json({ success: false, message: 'Failed to save deposit request.' });
    }
});

router.post("/withdraw-request", async (req, res) => {
    const { userId, amount, walletAddress } = req.body;

    try {
        // Validate the user
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check minimum withdrawal amount
        if (amount < 500) {
            return res.status(400).json({ message: "Minimum withdrawal amount is 500." });
        }

        // Check if user has enough balance
        if (user.balance < amount) {
            return res
                .status(400)
                .json({ message: "Insufficient balance to process this withdrawal." });
        }
        const txid = generateTransactionId();
        // Deduct balance
        user.balance -= amount;
        await user.save();

        // Save withdrawal request
        const withdrawal = new Withdraw({
            userId,
            amount,
            transactionId: txid,
            walletAddress,
            status: "pending", // Default status
        });

        await withdrawal.save();

        res.status(201).json({ message: "Withdrawal request submitted successfully!" });
    } catch (error) {
        console.error("Withdrawal error:", error.message);
        res.status(500).json({ message: "Failed to process withdrawal request." });
    }
});

router.get("/user/wallet", async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const user = await User.findOne({ userId });
        if (!user) return res.status(404).json({ error: "User not found." });

        const deposits = await Deposit.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean(); 

        deposits.forEach((deposit) => (deposit.type = "deposit"));

        const withdrawals = await Withdraw.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

        withdrawals.forEach((withdrawal) => (withdrawal.type = "withdraw"));

        const transactions = [...deposits, ...withdrawals].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );


        res.json({
            balance: user.balance || 0,
            transactions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

router.get("/user/referrals/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by userId
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the referrals
        res.status(200).json({ referrals: user.referrals });
    } catch (error) {
        console.error("Error fetching referrals:", error.message);
        res.status(500).json({ message: "Failed to fetch referrals" });
    }
});

router.get('/user/deposit-status/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ firstDepositCompleted: user.firstDepositCompleted });
    } catch (error) {
        console.error('Error checking first deposit status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
