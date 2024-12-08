const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const addReferralToInviter = async (invitedFrom, newUser) => {
    try {
        const inviter = await User.findOne({ inviteCode: invitedFrom });
        if (inviter) {
            inviter.referrals.push({
                email: newUser.email,
                userId: newUser.userId,
                joinedAt: new Date()
            });
            await inviter.save();
        } else {
            console.warn(`Inviter with inviteCode ${invitedFrom} not found.`);
        }
    } catch (error) {
        console.error('Error adding referral:', error.message);
    }
};

const registerUser = async (req, res) => {
    const { name, email, password, phone, invitedFrom, } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({
            username: name,
            email,
            password,
            phone,
            invitedFrom,
        });

        await user.save();

        if (invitedFrom) {
            addReferralToInviter(invitedFrom, user);
        }

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: 'User not found' });

        if (user.password !== password) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await User.findByIdAndUpdate(user._id, {
            lastActive: Date.now(),
            status: 'active'
        });

        // Return user, membership info, and token
        res.json({
            token,
            user: {
                id: user.userId,
                username: user.username,
                email: user.email,
                inviteCode: user.inviteCode
            },
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).send('Server error');
    }
};

module.exports = { registerUser, loginUser };
