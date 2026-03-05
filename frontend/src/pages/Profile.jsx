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

    if (loading) return (
        <div style={loaderContainer}>
            <div style={loader}></div>
            <p>Loading your profile...</p>
        </div>
    );

    if (!user) return (
        <div style={errorContainer}>
            <div style={errorCard}>
                <h2 style={{ color: '#d9534f' }}>⚠️ {errorMsg || "Data Not Found"}</h2>
                <p>Make sure your backend server is awake and you are logged in.</p>
                <button onClick={() => navigate('/login')} style={loginBtn}>Login Again</button>
            </div>
        </div>
    );

    const getProfileImage = () => {
        if (user.photo_url && !user.photo_url.includes('via.placeholder')) {
            return user.photo_url;
        }

        if (user.photo) {
            if (user.photo.startsWith('http')) {
                return user.photo;
            }
            const cleanPath = user.photo.startsWith('/') ? user.photo : `/${user.photo}`;
            const finalPath = cleanPath.includes('/media/') ? cleanPath : `/media${cleanPath}`;
            return `https://e-commerce-hmvn.onrender.com${finalPath}`;
        }

        return `https://ui-avatars.com/api/?name=${user.username}&background=febd69&color=fff`;
    };

    return (
        <div style={pageBackground}>
            <div style={contentWrapper}>
                <div style={profileSidebar}>
                    <div style={imageWrapper}>
                        <img 
                            src={getProfileImage()} 
                            alt="Profile" 
                            style={profileImg} 
                            onError={(e) => { 
                                e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=febd69&color=fff`; 
                            }}
                        />
                    </div>
                    <h2 style={userName}>{user.first_name || user.username}</h2>
                    <p style={userTag}>@{user.username}</p>
                    
                    <div style={detailsBox}>
                        <div style={detailItem}>
                            <strong>📧 Email</strong>
                            <span>{user.email}</span>
                        </div>
                        <div style={detailItem}>
                            <strong>📞 Phone</strong>
                            <span>{user.phone || 'Not Provided'}</span>
                        </div>
                        <div style={detailItem}>
                            <strong>📍 Address</strong>
                            <span>{user.address || 'Not Provided'}</span>
                        </div>
                    </div>
                    <button style={editBtn}>Edit Profile</button>
                </div>

                <div style={orderSection}>
                    <h3 style={sectionTitle}>📦 Order History ({orders.length})</h3>
                    <div style={orderGrid}>
                        {orders.length === 0 ? (
                            <div style={noOrderBox}>No orders placed yet.</div>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} style={orderCard}>
                                    <div style={orderHeader}>
                                        <span style={orderId}>Order #{order.id}</span>
                                        <span style={orderDate}>{new Date(order.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div style={orderBody}>
                                        <div style={priceTag}>${order.total_price}</div>
                                        <div style={statusTag}>{order.is_delivered ? '✅ Delivered' : '🚚 In Transit'}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const pageBackground = { backgroundColor: '#f4f7f9', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" };
const contentWrapper = { maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '30px', flexWrap: 'wrap' };
const profileSidebar = { flex: '1', minWidth: '320px', backgroundColor: '#fff', padding: '40px 20px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', height: 'fit-content' };
const imageWrapper = { width: '160px', height: '160px', margin: '0 auto 20px', borderRadius: '50%', padding: '5px', background: 'linear-gradient(45deg, #febd69, #f90)' };
const profileImg = { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff' };
const userName = { fontSize: '24px', color: '#131921', margin: '10px 0 5px', fontWeight: '700' };
const userTag = { color: '#888', marginBottom: '25px', fontSize: '14px' };
const detailsBox = { textAlign: 'left', marginBottom: '30px' };
const detailItem = { display: 'flex', flexDirection: 'column', padding: '12px 0', borderBottom: '1px solid #f0f0f0' };
const editBtn = { width: '100%', padding: '12px', backgroundColor: '#131921', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' };
const orderSection = { flex: '2', minWidth: '350px' };
const sectionTitle = { fontSize: '22px', color: '#131921', marginBottom: '20px', fontWeight: '700' };
const orderGrid = { display: 'flex', flexDirection: 'column', gap: '15px' };
const orderCard = { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderLeft: '6px solid #febd69', transition: 'transform 0.2s' };
const orderHeader = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' };
const orderId = { fontWeight: '700', color: '#131921' };
const orderDate = { fontSize: '13px', color: '#999' };
const orderBody = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const priceTag = { fontSize: '18px', fontWeight: '700', color: '#27ae60' };
const statusTag = { fontSize: '14px', fontWeight: '600', color: '#555' };
const noOrderBox = { padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', color: '#888' };
const loaderContainer = { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' };
const loader = { width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #febd69', borderRadius: '50%', animation: 'spin 1s linear infinite' };
const errorContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f9' };
const errorCard = { padding: '40px', backgroundColor: '#fff', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const loginBtn = { padding: '10px 25px', backgroundColor: '#febd69', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' };

export default Profile;
