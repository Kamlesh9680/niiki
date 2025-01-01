import React, { useState } from 'react';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';

const Demo = () => {

    const [orderId, setOrderId] = useState("");

    let cashfree;

    let initializeSDK = async function () {
        cashfree = await load({
            mode: 'sandbox',
        })
    }
    initializeSDK();

    const getSessionId = async () => {
        try {
            let res = await axios.post('http://localhost:5000/api/payment');
            if (res.data && res.data.payment_session_id) {
                console.log(res.data);
                return {
                    paymentSessionId: res.data.payment_session_id,
                    orderId: res.data.order_id,
                };
            }
        } catch (error) {
            console.error("Error fetching session ID:", error);
        }
    };
    

    const verifyPayment = async (orderId) => {
        try {
            console.log(orderId);

            // Make a POST request to verify the payment
            const res = await axios.post("http://localhost:5000/api/verify", {
                orderId: orderId,
            });

            // Check if the response and data exist
            if (res && res.data) {
                alert("Payment verified");
            } else {
                alert("Payment verification failed");
            }

        } catch (error) {
            console.error("Error verifying payment:", error);

            if (error.response) {
                console.error("Server responded with:", error.response.data);
                alert(`Error: ${error.response.data.message || "Verification failed"}`);
            } else if (error.request) {
                alert("No response from server. Please check your connection.");
            } else {
                alert("Error setting up the request.");
            }
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            let sessionData = await getSessionId();
            if (sessionData) {
                const { paymentSessionId, orderId } = sessionData;

                let checkoutOptions = {
                    paymentSessionId: paymentSessionId,
                    redirectTarget: '_modal',
                };

                cashfree.checkout(checkoutOptions).then(() => {
                    console.log("Payment initialized");
                    verifyPayment(orderId);
                });
            }
        } catch (error) {
            console.error("Error during payment initialization:", error);
        }
    };

    return (
        <>
            <button onClick={handleClick} className='bg-customPurple text-white p-5'>Pay Now</button>
        </>
    )
}

export default Demo;