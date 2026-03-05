import React, { useEffect, useState } from 'react';
import api from '../api';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, orderRes] = await Promise.all([
                    api.get('profile-update/'),
                    api.get('orders/')
                ]);
                setUser(userRes.data);
                setOrders(orderRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p style={{ padding: '20px' }}>Loading profile...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                <div style={infoCard}>
                    <img 
                        src={user.photo || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        style={profileImg} 
                    />
                    <h2 style={{ marginTop: '15px' }}>{user.first_name}</h2>
                    <p><strong>Username:</strong> @{user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                </div>

                <div style={{ flex: '1.5' }}>
                    <h2 style={{ marginBottom: '20px' }}>Your Order History</h2>
                    {orders.length === 0 ? <p>No orders placed yet.</p> : orders.map(order => (
                        <div key={order.id} style={orderItem}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Order ID: #{order.id}</strong>
                                <span>{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <p style={{ color: '#27ae60', fontWeight: 'bold' }}>Amount Paid: ${order.total_price}</p>
                            <p style={{ fontSize: '13px', color: '#666' }}>Status: {order.is_delivered ? 'Delivered' : 'Processing'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const infoCard = { flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' };
const profileImg = { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #febd69' };
const orderItem = { backgroundColor: '#fff', padding: '15px', marginBottom: '15px', borderRadius: '8px', borderLeft: '6px solid #febd69', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' };

export default Profile;
