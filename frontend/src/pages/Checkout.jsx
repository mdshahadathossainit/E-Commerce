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
        <div style={pageWrapper}>
            <div style={checkoutContainer}>
                <div style={cardHeader}>
                    <h2 style={title}>Checkout Summary</h2>
                    <div style={stepper}>
                        <div style={stepActive}>Cart</div>
                        <div style={lineActive}></div>
                        <div style={stepActive}>Checkout</div>
                        <div style={line}></div>
                        <div style={step}>Finish</div>
                    </div>
                </div>

                <div style={contentGrid}>
                    <div style={formSection}>
                        <form onSubmit={handleOrder}>
                            <h3 style={sectionTitle}>Shipping Information</h3>
                            <label style={labelStyle}>Complete Delivery Address</label>
                            <textarea 
                                required 
                                placeholder="House no, Road name, Area..."
                                style={textareaStyle} 
                                onChange={(e) => setAddress(e.target.value)} 
                            />
                            
                            <h3 style={sectionTitle}>Payment Details</h3>
                            <label style={labelStyle}>Select Method</label>
                            <select style={selectStyle} onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                                <option value="Cash on Delivery">💵 Cash on Delivery (COD)</option>
                                <option value="Card">💳 Credit / Debit Card</option>
                            </select>

                            <button type="submit" style={confirmBtnStyle}>Confirm & Pay Now</button>
                        </form>
                    </div>

                    <div style={summarySidebar}>
                        <h3 style={summaryTitle}>Order Total</h3>
                        <div style={summaryRow}>
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div style={summaryRow}>
                            <span>Shipping</span>
                            <span style={{ color: '#27ae60' }}>Free</span>
                        </div>
                        <div style={summaryRow}>
                            <span>Tax</span>
                            <span>$0.00</span>
                        </div>
                        <div style={totalDivider}></div>
                        <div style={finalRow}>
                            <span>Grand Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <p style={secureNote}>🔒 Secure Checkout via Encrypted SSL</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const pageWrapper = {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: "'Inter', sans-serif"
};

const checkoutContainer = {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    overflow: 'hidden'
};

const cardHeader = {
    padding: '30px',
    borderBottom: '1px solid #eee',
    textAlign: 'center'
};

const title = {
    fontSize: '28px',
    color: '#131921',
    margin: '0 0 20px 0',
    fontWeight: '800'
};

const stepper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#aaa'
};

const stepActive = { color: '#f90', fontWeight: 'bold' };
const step = { color: '#ccc' };
const lineActive = { height: '2px', width: '30px', background: '#f90' };
const line = { height: '2px', width: '30px', background: '#eee' };

const contentGrid = {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '0'
};

const formSection = {
    padding: '40px',
    borderRight: '1px solid #eee'
};

const summarySidebar = {
    padding: '40px',
    backgroundColor: '#fafafa'
};

const sectionTitle = {
    fontSize: '18px',
    marginBottom: '15px',
    marginTop: '25px',
    color: '#333',
    fontWeight: '700'
};

const labelStyle = {
    fontSize: '13px',
    color: '#666',
    display: 'block',
    marginBottom: '8px'
};

const textareaStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    height: '100px',
    resize: 'none',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box'
};

const selectStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#fff',
    boxSizing: 'border-box'
};

const confirmBtnStyle = {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(90deg, #febd69 0%, #f90 100%)',
    color: '#111',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '800',
    borderRadius: '8px',
    marginTop: '30px',
    fontSize: '16px',
    boxShadow: '0 4px 15px rgba(255, 153, 0, 0.3)'
};

const summaryTitle = {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#131921'
};

const summaryRow = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '15px',
    color: '#555'
};

const totalDivider = {
    height: '1px',
    background: '#ddd',
    margin: '20px 0'
};

const finalRow = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '22px',
    fontWeight: '800',
    color: '#131921'
};

const secureNote = {
    marginTop: '30px',
    fontSize: '12px',
    color: '#999',
    textAlign: 'center'
};

export default Checkout;
