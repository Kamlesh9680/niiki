const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
