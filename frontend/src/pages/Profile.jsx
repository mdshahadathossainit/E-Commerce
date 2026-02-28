import React, { useEffect, useState } from 'react';
import api from '../api';

const Profile = () => {
    const [orders, setOrders] = useState([]);

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
            }
        };
        fetchOrders();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Order History</h2>
            {orders.length === 0 ? <p>No orders yet.</p> : (
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>${order.total_price}</td>
                                <td>{order.is_delivered ? 'Delivered' : 'Pending'}</td>
                                <td>{order.is_paid ? 'Paid' : 'Unpaid'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Profile;
