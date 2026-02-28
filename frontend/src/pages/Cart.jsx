import React, { useEffect, useState } from 'react';
import api from '../api';

const Cart = () => {
    const [cart, setCart] = useState(null);

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

    if (!cart) return <div style={{ padding: '20px' }}>Loading Cart...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Shopping Cart</h2>
            {cart.items.length === 0 ? <p>Cart is empty</p> : (
                <ul>
                    {cart.items.map(item => (
                        <li key={item.id} style={{ marginBottom: '10px' }}>
                            {item.product.name} - Quantity: {item.quantity} - ${item.product.price}
                        </li>
                    ))}
                </ul>
            )}
            <button style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none' }}>
                Checkout
            </button>
        </div>
    );
};

export default Cart;
