import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('access');
            try {
                const res = await api.get('admin-stats/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (err) {
                console.error("Access Denied or Error", err);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <div style={{ padding: '20px' }}>Loading Dashboard or Access Denied...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Admin Business Overview</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={cardStyle}>
                    <h3>Total Sales</h3>
                    <p style={{ fontSize: '24px', color: 'green' }}>${stats.total_sales}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Orders</h3>
                    <p style={{ fontSize: '24px' }}>{stats.total_orders}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Products</h3>
                    <p style={{ fontSize: '24px' }}>{stats.total_products}</p>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: '200px',
    textAlign: 'center',
    background: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

export default AdminDashboard;
