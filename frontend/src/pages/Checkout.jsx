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
            navigate('/profile');
        } catch (error) {
            alert(error.response?.data?.error || "Order Failed.");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Checkout Summary</h2>
                <p style={{ fontSize: '1.2rem' }}>Total Amount: <strong>${totalPrice.toFixed(2)}</strong></p>
                <form onSubmit={handleOrder}>
                    <label>Shipping Address:</label>
                    <textarea required style={inputStyle} onChange={(e) => setAddress(e.target.value)} />
                    
                    <label>Payment Method:</label>
                    <select style={inputStyle} onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Card">Credit Card</option>
                    </select>

                    <button type="submit" style={confirmBtnStyle}>Pay & Confirm Order</button>
                </form>
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ddd' };
const confirmBtnStyle = { width: '100%', padding: '12px', background: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' };

export default Checkout;
