const express = require('express');
const crypto = require('crypto');
const { Cashfree } = require("cashfree-pg");
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Configure Cashfree
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

// Generate Unique Order ID
function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);
    const orderId = hash.digest('hex');
    return orderId.substr(0, 12);
}

// Payment Endpoint
router.post('/payment', async (req, res) => {
    try {
        const { amount, userId, customerPhone } = req.body;

        const customerName = `User_${userId}`;
        const customerEmail = `user${userId}@example.com`;
        const orderId =  generateOrderId();

        const request = {
            "order_amount": amount,
            "order_currency": "INR",
            "order_id": orderId,
            "customer_details": {
                "customer_id": userId,
                "customer_name": customerName,
                "customer_email": customerEmail,
                "customer_phone": customerPhone
            },
            "order_meta": {
                "return_url": `https://niiki.in/pg/payment_return?order_id={orderId}`
            },
            "order_note": "Deposit"
        };

        // Create Order
        console.log("Request being sent to Cashfree:", request);

        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        console.log(response.data);

        res.json(response.data);
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/verify', async (req, res) => {
    try {
        let { orderId } = req.body;
        console.log("Received Order ID for verification:", orderId);

        // Assuming Cashfree.PGOrderFetchPayments returns a promise
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
        res.json(response.data); // Send the response data to the client

    } catch (error) {
        // Log the error and send a proper response to the client
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while verifying the payment', error: error.message });
    }
});


module.exports = router;
