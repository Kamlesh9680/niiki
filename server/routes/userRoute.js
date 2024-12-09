const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();
const Notification = require("../models/Notification");

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


module.exports = router;
