import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await api.get('cart/');
                if (res.data && res.data.length > 0) {
                    setCart(res.data[0]);
                } else {
                    setCart({ items: [] });
                }
            } catch (error) {
                console.error("Error fetching cart", error);
                setCart({ items: [] });
            }
        };
        fetchCart();
    }, []);

    const calculateTotal = () => {
        if (!cart || !cart.items) return "0.00";
        return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
    };

    if (!cart) return (
        <div style={loaderContainer}>
            <div style={loader}></div>
        </div>
    );

    return (
        <div style={pageWrapper}>
            <div style={container}>
                <h2 style={headerTitle}>🛒 Your Shopping Cart</h2>
                
                {cart.items.length === 0 ? (
                    <div style={emptyCartBox}>
                        <div style={{ fontSize: '50px' }}>🛍️</div>
                        <h3>Your cart is empty</h3>
                        <button onClick={() => navigate('/')} style={shopBtn}>Start Shopping</button>
                    </div>
                ) : (
                    <>
                        <div style={cartCard}>
                            {cart.items.map((item, index) => (
                                <div key={item.id} style={{
                                    ...itemRow,
                                    borderBottom: index === cart.items.length - 1 ? 'none' : '1px solid #eee'
                                }}>
                                    <div style={productInfo}>
                                        <div style={imgWrapper}>
                                            <img 
                                                src={item.product.display_image} 
                                                alt={item.product.name} 
                                                style={productImg} 
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                            />
                                        </div>
                                        <div>
                                            <h4 style={productName}>{item.product.name}</h4>
                                            <div style={qtyBadge}>Quantity: {item.quantity}</div>
                                        </div>
                                    </div>
                                    <div style={priceContainer}>
                                        <div style={unitPrice}>${item.product.price} each</div>
                                        <div style={totalItemPrice}>${(item.product.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={summaryCard}>
                            <div style={summaryRow}>
                                <span>Subtotal</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div style={summaryRow}>
                                <span>Shipping</span>
                                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>FREE</span>
                            </div>
                            <div style={divider}></div>
                            <div style={totalRow}>
                                <span>Total Amount</span>
                                <span style={finalAmount}>${calculateTotal()}</span>
                            </div>
                            
                            <button onClick={() => navigate('/checkout')} style={checkoutBtn}>
                                Proceed to Checkout 🚀
                            </button>
                            <button onClick={() => navigate('/')} style={continueBtn}>
                                ← Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const pageWrapper = {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: "'Poppins', sans-serif"
};

const container = {
    maxWidth: '900px',
    margin: '0 auto'
};

const headerTitle = {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '32px',
    fontWeight: '800'
};

const cartCard = {
    background: '#fff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    marginBottom: '30px'
};

const itemRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    flexWrap: 'wrap',
    gap: '15px'
};

const productInfo = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flex: '1',
    minWidth: '250px'
};

const imgWrapper = {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
};

const productImg = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const productName = {
    margin: '0 0 5px 0',
    fontSize: '16px',
    color: '#333',
    fontWeight: '600'
};

const qtyBadge = {
    fontSize: '12px',
    background: '#f0f2f5',
    padding: '4px 10px',
    borderRadius: '20px',
    color: '#666',
    display: 'inline-block'
};

const priceContainer = {
    textAlign: 'right'
};

const unitPrice = {
    fontSize: '13px',
    color: '#888',
    marginBottom: '4px'
};

const totalItemPrice = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#131921'
};

const summaryCard = {
    background: '#131921',
    borderRadius: '20px',
    padding: '30px',
    color: '#fff',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
};

const summaryRow = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '16px',
    color: '#ccc'
};

const divider = {
    height: '1px',
    background: 'rgba(255,255,255,0.1)',
    margin: '20px 0'
};

const totalRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
};

const finalAmount = {
    fontSize: '28px',
    fontWeight: '800',
    color: '#febd69'
};

const checkoutBtn = {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(90deg, #febd69 0%, #f90 100%)',
    color: '#111',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    marginBottom: '15px'
};

const continueBtn = {
    width: '100%',
    background: 'transparent',
    color: '#aaa',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '12px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px'
};

const emptyCartBox = {
    textAlign: 'center',
    padding: '60px',
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
};

const shopBtn = {
    marginTop: '20px',
    padding: '12px 30px',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
};

const loaderContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f4f7f6'
};

const loader = {
    width: '50px',
    height: '50px',
    border: '5px solid #ddd',
    borderTop: '5px solid #febd69',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
};

export default Cart;
