const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'rejected'],
        default: 'pending'
    },
    walletAddress: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;
