import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const navigate = useNavigate();

    const handleOrder = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');
        try {
            await api.post('orders/', {
                shipping_address: address,
                payment_method: paymentMethod,
                total_price: 0 // Backend will calculate based on cart
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Order Placed Successfully!");
            navigate('/');
        } catch (error) {
            alert("Failed to place order.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px' }}>
            <h2>Checkout / Order Summary</h2>
            <form onSubmit={handleOrder}>
                <label>Shipping Address:</label><br />
                <textarea 
                    required
                    style={{ width: '100%', height: '80px', marginBottom: '15px' }}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>

                <label>Payment Method:</label><br />
                <select 
                    style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Stripe">Stripe / Card</option>
                </select>

                <button type="submit" style={{ padding: '10px 20px', background: 'orange', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
