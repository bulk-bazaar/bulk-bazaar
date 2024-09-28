import React, { useState, useEffect } from 'react';

const RazorpayPayment = () => {
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            document.body.appendChild(script);
        });
    };
    useEffect(() => {
        loadRazorpay()
    }, []);
    const [orderId, setOrderId] = useState('');

    const createOrder = async () => {
        /*const response = await fetch('/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 50000 }), // Amount in paise
        });
        const data = await response.json();*/
        setOrderId('data.id');
    };

    useEffect(() => {
        createOrder();
    }, []);

    const handlePayment = () => {
        const options = {
            key: 'your_key_id',
            amount: 50000,
            currency: 'INR',
            name: 'Your Company Name',
            description: 'Test Transaction',
            image: 'https://your-logo-url.com/logo.png',
            order_id: orderId,
            handler: function (response: any) {
                alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Customer Address',
            },
            theme: {
                color: '#F37254',
            },
        };

        // @ts-ignore
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div>
            <h2>Razorpay Payment</h2>
            <button onClick={handlePayment} disabled={!orderId}>
                Pay with Razorpay
            </button>
        </div>
    );
};

export default RazorpayPayment;
