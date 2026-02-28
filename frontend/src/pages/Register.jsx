import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('register/', formData);
            alert('Registration Successful! Please Login.');
            navigate('/login');
        } catch (error) {
            alert('Registration Failed. Try again.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} /><br /><br />
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} /><br /><br />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} /><br /><br />
                <input type="text" placeholder="Phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} /><br /><br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
