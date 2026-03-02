import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartTotal = async () => {
            try {
                const res = await api.get('cart/');
                if (res.data && res.data.length > 0) {
                    const total = res.data[0].items.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);
                    setTotalPrice(total);
                }
            } catch (err) { console.error(err); }
        };
        fetchCartTotal();
    }, []);

    const handleOrder = async (e) => {
        e.preventDefault();
        try {
            await api.post('orders/', {
                shipping_address: address,
                payment_method: paymentMethod
            });
            alert("Order Placed Successfully!");
            navigate('/profile');
        } catch (error) {
            alert(error.response?.data?.error || "Order Failed.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Checkout Summary</h2>
            <p><strong>Total Amount: ${totalPrice.toFixed(2)}</strong></p>
            <form onSubmit={handleOrder}>
                <label>Shipping Address:</label><br />
                <textarea 
                    required 
                    style={{ width: '100%', height: '80px', marginBottom: '15px', padding: '10px' }} 
                    onChange={(e) => setAddress(e.target.value)} 
                />
                <label>Payment Method:</label><br />
                <select 
                    style={{ width: '100%', padding: '10px', marginBottom: '20px' }} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Stripe">Credit Card (Stripe)</option>
                </select>
                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '12px', background: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px' }}
                >
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
