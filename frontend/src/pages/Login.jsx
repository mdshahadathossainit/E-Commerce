import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('login/', { username, password });
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            alert('Login Successful!');
            navigate('/');
        } catch (error) {
            alert('Invalid Credentials');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br /><br />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
