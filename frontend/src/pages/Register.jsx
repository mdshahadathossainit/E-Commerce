import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

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
                alert("Username already exists. Please try another one.");
            } else if (error.response?.status === 500) {
                alert("Server Error (500). Please check if backend migrations are applied.");
            } else {
                alert("Registration Failed. Please check your information.");
            }
        }
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleRegister} style={formStyle}>
                <h2 style={{ textAlign: 'center', color: '#131921', marginBottom: '20px' }}>Create Account</h2>
                
                <div style={inputGroup}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Profile Picture</label>
                    <input type="file" name="photo" onChange={handleChange} accept="image/*" required />
                </div>

                <input type="text" name="first_name" placeholder="Full Name" onChange={handleChange} style={inputStyle} required />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} style={inputStyle} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} style={inputStyle} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} style={inputStyle} required />
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} style={inputStyle} required />
                <textarea name="address" placeholder="Complete Address" onChange={handleChange} style={{ ...inputStyle, height: '80px', resize: 'none' }} required />
                
                <button type="submit" style={btnStyle}>Sign Up & View Profile</button>
            </form>
        </div>
    );
};

const containerStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center', 
    minHeight: '100vh', backgroundColor: '#f3f3f3', padding: '20px'
};

const formStyle = {
    backgroundColor: '#fff', padding: '30px', borderRadius: '8px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px'
};

const inputStyle = {
    width: '100%', padding: '12px', margin: '10px 0', 
    borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box',
    fontSize: '14px'
};

const inputGroup = { margin: '15px 0' };

const btnStyle = {
    width: '100%', padding: '12px', backgroundColor: '#febd69', 
    border: '1px solid #a88734', borderRadius: '4px', cursor: 'pointer', 
    fontWeight: 'bold', fontSize: '16px', marginTop: '15px',
    transition: 'background 0.3s'
};

export default Register;
