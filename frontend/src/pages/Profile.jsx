import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

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
                console.error("Fetch error:", err);
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    setErrorMsg("Session expired. Please login again.");
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                } else {
                    setErrorMsg("Server error. Please ensure migrations are applied on backend.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    if (loading) return <p style={{ padding: '20px' }}>Loading your profile...</p>;

    if (!user) return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>⚠️ {errorMsg || "Data Not Found"}</h2>
            <p>Make sure your backend server is awake and you are logged in.</p>
            <button 
                onClick={() => navigate('/login')}
                style={{ padding: '10px 20px', backgroundColor: '#febd69', border: 'none', cursor: 'pointer', borderRadius: '4px', marginTop: '10px' }}
            >
                Login Again
            </button>
        </div>
    );
    const getProfileImage = () => {
        if (user.photo_url) return user.photo_url;
        if (user.photo) {
            return user.photo.startsWith('http') ? user.photo : `https://e-commerce-hmvn.onrender.com${user.photo}`;
        }
        return "https://via.placeholder.com/150";
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                <div style={infoCard}>
                    <img 
                        src={getProfileImage()} 
                        alt="Profile" 
                        style={profileImg} 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                    />
                    <h2 style={{ marginTop: '15px' }}>{user.first_name || user.username}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                    <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                </div>

                <div style={{ flex: '1.5' }}>
                    <h2 style={{ marginBottom: '20px' }}>Order History</h2>
                    {orders.length === 0 ? <p>No orders yet.</p> : orders.map(order => (
                        <div key={order.id} style={orderItem}>
                            <strong>Order #{order.id}</strong> - ${order.total_price}
                            <span style={{ float: 'right', fontSize: '12px', color: '#888' }}>
                                {new Date(order.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const infoCard = { flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' };
const profileImg = { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #febd69' };
const orderItem = { backgroundColor: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '5px', borderLeft: '5px solid #febd69' };

export default Profile;
