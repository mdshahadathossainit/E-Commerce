import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

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
        <div style={containerStyle}>
            <div style={overlayStyle}></div>
            <form onSubmit={handleLogin} style={formStyle}>
                <h2 style={titleStyle}>Welcome Back</h2>
                <p style={subtitleStyle}>Login to access your account</p>
                
                <div style={inputGroup}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={inputStyle}
                        required 
                    />
                </div>

                <div style={inputGroup}>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={inputStyle}
                        required 
                    />
                </div>

                <button type="submit" style={btnStyle}>Sign In</button>

                <div style={footerStyle}>
                    <span>New here? </span>
                    <Link to="/register" style={linkStyle}>Create an account</Link>
                </div>
            </form>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
    backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const overlayStyle = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(135deg, rgba(35, 47, 62, 0.9) 0%, rgba(19, 25, 33, 0.7) 100%)',
    zIndex: 1
};

const formStyle = {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
};

const titleStyle = {
    margin: '0 0 10px',
    color: '#131921',
    fontSize: '26px',
    fontWeight: '700'
};

const subtitleStyle = {
    color: '#555',
    marginBottom: '30px',
    fontSize: '14px'
};

const inputGroup = {
    marginBottom: '15px'
};

const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: '#fdfdfd'
};

const btnStyle = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(to right, #febd69, #f90)',
    border: '1px solid #a88734',
    borderRadius: '6px',
    color: '#111',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

const footerStyle = {
    marginTop: '20px',
    fontSize: '14px',
    color: '#333'
};

const linkStyle = {
    color: '#007185',
    textDecoration: 'none',
    fontWeight: 'bold'
};

export default Login;
