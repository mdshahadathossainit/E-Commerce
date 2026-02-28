import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Stripe');
    const navigate = useNavigate();

    const handleOrder = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');
        
        try {
            await api.post('orders/', {
                shipping_address: address,
                payment_method: paymentMethod,
                total_price: 100 
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (paymentMethod === 'Stripe') {
                alert("Redirecting to Stripe Payment Gateway...");
                alert("Payment Successful!");
            }

            alert("Order Placed and Paid Successfully!");
            navigate('/profile');
        } catch (error) {
            alert("Order Failed.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h2>Checkout / Order Summary</h2>
            <form onSubmit={handleOrder}>
                <label>Shipping Address:</label><br />
                <textarea 
                    required 
                    style={{ width: '100%', height: '80px', marginBottom: '15px' }} 
                    onChange={(e) => setAddress(e.target.value)} 
                />
                
                <label>Payment Method:</label><br />
                <select 
                    style={{ width: '100%', padding: '10px', marginBottom: '20px' }} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                >
                    <option value="Stripe">Credit Card (Stripe)</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                </select>

                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '10px', background: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Pay & Confirm Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
