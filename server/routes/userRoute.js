const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();
const Notification = require("../models/Notification");
const User = require("../models/User");

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

router.get('/notifications/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ userId }).sort({ timestamp: -1 }); // Latest first
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
});

router.get('/user/deposit-status/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch deposit status from the database
        const user = await User.findOne({ userId }); // Adjust query based on your schema
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ firstDepositCompleted: user.firstDepositCompleted || false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch deposit status" });
    }
});


module.exports = router;
