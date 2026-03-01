import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();
    const BASE_URL = 'https://e-commerce-hmvn.onrender.com';

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('access');
                const res = await api.get('cart/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCart(res.data[0]);
            } catch (error) {
                console.error("Error fetching cart", error);
            }
        };
        fetchCart();
    }, []);

    const calculateTotal = () => {
        return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
    };

    if (!cart) return <div style={{ padding: '20px' }}>Loading Cart...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Your Shopping Cart</h2>
            {cart.items.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                        {cart.items.map(item => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    
                                    <img 
                                        src={item.product.image.startsWith('http') ? item.product.image : `${BASE_URL}${item.product.image}`} 
                                        alt={item.product.name} 
                                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} 
                                    />
                                    <span>{item.product.name} (x{item.quantity})</span>
                                </div>
                                <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                            </div>
                        ))}
                        <div style={{ textAlign: 'right', marginTop: '15px', fontSize: '1.2rem' }}>
                            <strong>Total: ${calculateTotal()}</strong>
                        </div>
                    </div>

                    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                        <h3>Payment Method</h3>
                        <label style={{ display: 'block', marginBottom: '15px', cursor: 'pointer' }}>
                            <input type="radio" name="payment" checked readOnly /> Cash on Delivery (COD)
                        </label>
                        
                        <button 
                            onClick={() => navigate('/checkout')}
                            style={{ 
                                width: '100%',
                                padding: '12px', 
                                background: '#27ae60', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
