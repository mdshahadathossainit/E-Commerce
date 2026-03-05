import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        photo: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, photo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        }
        try {
            await api.post('register/', data);
            const loginRes = await api.post('login/', { 
                username: formData.username, 
                password: formData.password 
            });
            localStorage.setItem('access', loginRes.data.access);
            localStorage.setItem('refresh', loginRes.data.refresh);
            alert('Registration Successful!');
            navigate('/profile');
        } catch (error) {
            const errorData = error.response?.data;
            if (errorData?.username) {
                alert("Username already exists.");
            } else {
                alert("Registration Failed.");
            }
        }
    };

    return (
        <div style={containerStyle}>
            <div style={overlayStyle}></div>
            <form onSubmit={handleRegister} style={formStyle}>
                <h2 style={titleStyle}>Create Account</h2>
                <p style={subtitleStyle}>Join our community today</p>
                
                <div style={scrollContainer}>
                    <div style={inputGroup}>
                        <label style={labelStyle}>Profile Picture</label>
                        <input type="file" name="photo" onChange={handleChange} accept="image/*" required style={fileInputStyle} />
                    </div>

                    <input type="text" name="first_name" placeholder="Full Name" onChange={handleChange} style={inputStyle} required />
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} style={inputStyle} required />
                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} style={inputStyle} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} style={inputStyle} required />
                    <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} style={inputStyle} required />
                    <textarea name="address" placeholder="Complete Address" onChange={handleChange} style={textareaStyle} required />
                </div>
                
                <button type="submit" style={btnStyle}>Sign Up Now</button>

                <div style={footerStyle}>
                    <span>Already have an account? </span>
                    <Link to="/login" style={linkStyle}>Login</Link>
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
    backgroundImage: 'url("https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2064&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const overlayStyle = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(135deg, rgba(19, 25, 33, 0.85) 0%, rgba(35, 47, 62, 0.75) 100%)',
    zIndex: 1
};

const formStyle = {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center'
};

const titleStyle = {
    margin: '0 0 5px',
    color: '#131921',
    fontSize: '26px',
    fontWeight: '700'
};

const subtitleStyle = {
    color: '#666',
    marginBottom: '20px',
    fontSize: '14px'
};

const scrollContainer = {
    maxHeight: '60vh',
    overflowY: 'auto',
    padding: '5px',
    marginBottom: '15px'
};

const inputGroup = {
    textAlign: 'left',
    marginBottom: '15px',
    padding: '0 5px'
};

const labelStyle = {
    fontWeight: '600',
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontSize: '14px'
};

const fileInputStyle = {
    width: '100%',
    fontSize: '13px'
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '14px',
    backgroundColor: '#f9f9f9',
    outline: 'none'
};

const textareaStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '14px',
    height: '80px',
    resize: 'none',
    backgroundColor: '#f9f9f9',
    outline: 'none'
};

const btnStyle = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(to right, #febd69, #f90)',
    border: '1px solid #a88734',
    borderRadius: '8px',
    color: '#111',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s'
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

export default Register;
