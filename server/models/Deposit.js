const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    trackId: {
        type: String,
        required: true
    },
    screenshot: {
        type: String, 
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'rejected'], 
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
