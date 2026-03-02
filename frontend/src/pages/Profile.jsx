import React, { useEffect, useState } from 'react';
import api from '../api';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const [userData, setUserData] = useState({
        username: '', email: '', address: '', phone: '', photo: null
    });
    const [previewImage, setPreviewImage] = useState(null);
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
                if (userRes.data.photo) setPreviewImage(userRes.data.photo);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserData({ ...userData, photo: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', userData.email);
        formData.append('phone', userData.phone || '');
        formData.append('address', userData.address || '');
        if (userData.photo instanceof File) {
            formData.append('photo', userData.photo);
        }

        try {
            await api.put('profile-update/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
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
                    <h2 style={{ borderBottom: '2px solid #febd69', paddingBottom: '10px', marginBottom: '20px' }}>Profile Settings</h2>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <img 
                            src={previewImage || "https://via.placeholder.com/150"} 
                            alt="Profile" 
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #febd69' }} 
                        />
                        <br />
                        <input type="file" onChange={handleFileChange} style={{ marginTop: '10px', fontSize: '12px' }} />
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 'bold' }}>Username</label>
                            <input type="text" value={userData.username} disabled style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', marginTop: '5px' }} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 'bold' }}>Email</label>
                            <input type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '5px' }} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 'bold' }}>Phone</label>
                            <input type="text" value={userData.phone || ''} onChange={(e) => setUserData({...userData, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '5px' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontWeight: 'bold' }}>Address</label>
                            <textarea value={userData.address || ''} onChange={(e) => setUserData({...userData, address: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '5px', height: '80px' }} />
                        </div>
                        <button type="submit" style={{ width: '100%', backgroundColor: '#febd69', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save Profile</button>
                    </form>
                </div>
                <div style={{ flex: '1.5', minWidth: '350px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Order History</h2>
                    {orders.length === 0 ? <p>No orders yet.</p> : orders.map(order => (
                        <div key={order.id} style={{ backgroundColor: '#fff', padding: '20px', marginBottom: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '5px solid #febd69' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Order #{order.id}</strong>
                                <span style={{ color: '#777' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <p style={{ fontWeight: 'bold', color: '#27ae60' }}>Total: ${order.total_price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
