import React, { useEffect, useState } from 'react';
import api from '../api';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('access');
            try {
                const res = await api.get('orders/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p style={{ padding: '20px' }}>Loading orders...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h2>My Order History</h2>
            <hr />
            {orders.length === 0 ? <p>You haven't placed any orders yet.</p> : (
                <div style={{ marginTop: '20px' }}>
                    {orders.map(order => (
                        <div key={order.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px', background: '#fff' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Order #{order.id}</strong>
                                <span style={{ color: '#7f8c8d' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <p style={{ margin: '10px 0' }}>Total Price: <strong style={{ color: '#27ae60' }}>${order.total_price}</strong></p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{ background: order.is_paid ? '#d4edda' : '#f8d7da', padding: '2px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>
                                    {order.is_paid ? 'Paid' : 'Payment Pending'}
                                </span>
                                <span style={{ background: order.is_delivered ? '#d1ecf1' : '#fff3cd', padding: '2px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>
                                    {order.is_delivered ? 'Delivered' : 'Processing'}
                                </span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '10px' }}>Method: {order.payment_method}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
