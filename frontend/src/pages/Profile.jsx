import React, { useEffect, useState } from 'react';
import api from '../api';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const [userData, setUserData] = useState({
        username: '', email: '', address: '', phone: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, orderRes] = await Promise.all([
                    api.get('profile-update/'),
                    api.get('orders/')
                ]);
                setUserData(userRes.data);
                setOrders(orderRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put('profile-update/', userData);
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Update failed!");
        }
    };

    if (loading) return <p style={{ padding: '20px' }}>Loading profile...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                
                <div style={{ flex: '1', minWidth: '320px', backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ borderBottom: '2px solid #febd69', paddingBottom: '10px', marginBottom: '20px' }}>User Settings</h2>
                    <form onSubmit={handleUpdate}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 'bold' }}>Username</label>
                            <input type="text" value={userData.username} disabled style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', marginTop: '5px' }} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 'bold' }}>Email Address</label>
                            <input type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '5px' }} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 'bold' }}>Phone Number</label>
                            <input type="text" value={userData.phone || ''} onChange={(e) => setUserData({...userData, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '5px' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontWeight: 'bold' }}>Default Shipping Address</label>
                            <textarea value={userData.address || ''} onChange={(e) => setUserData({...userData, address: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '5px', height: '100px' }} />
                        </div>
                        <button type="submit" style={{ width: '100%', backgroundColor: '#febd69', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save Profile Details</button>
                    </form>
                </div>

                <div style={{ flex: '1.5', minWidth: '350px' }}>
                    <h2 style={{ marginBottom: '20px' }}>My Order History</h2>
                    {orders.length === 0 ? (
                        <div style={{ padding: '40px', backgroundColor: '#fff', textAlign: 'center', borderRadius: '8px' }}>
                            <p>You haven't placed any orders yet.</p>
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} style={{ backgroundColor: '#fff', padding: '20px', marginBottom: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '5px solid #febd69' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <strong>Order ID: #{order.id}</strong>
                                    <span style={{ color: '#777', fontSize: '0.9rem' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#27ae60' }}>Total Price: ${order.total_price}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <span style={{ backgroundColor: order.is_paid ? '#d4edda' : '#f8d7da', color: order.is_paid ? '#155724' : '#721c24', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {order.is_paid ? 'PAID' : 'PAYMENT PENDING'}
                                    </span>
                                    <span style={{ backgroundColor: order.is_delivered ? '#d1ecf1' : '#fff3cd', color: order.is_delivered ? '#0c5460' : '#856404', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {order.is_delivered ? 'DELIVERED' : 'PROCESSING'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
