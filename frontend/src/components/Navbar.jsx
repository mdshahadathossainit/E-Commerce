
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
    const navigate = useNavigate();

    useEffect(() => {
        const clockTimer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(clockTimer);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsLoggedIn(false);
        alert('Logged Out Successfully');
        navigate('/login');
    };

    return (
        <header style={navContainer}>
            <div style={logoWrapper} onClick={() => navigate('/')}>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '20px', cursor: 'pointer' }}>
                    <span style={{ color: '#febd69' }}>🏠 Home</span>
                </h2>
            </div>

            <div style={searchWrapper}>
                <input 
                    type="text" 
                    placeholder="Search for amazing products..." 
                    style={searchInput}
                />
                <button style={searchBtn}>🔍</button>
            </div>

            {isLoggedIn ? (
                <div onClick={handleLogout} style={navLinkPointer}>
                    <span style={topText}>Hello, User</span>
                    <div style={{...bottomText, color: '#ff4d4d'}}>Logout</div>
                </div>
            ) : (
                <div onClick={() => navigate('/login')} style={navLinkPointer}>
                    <span style={topText}>Hello, Guest</span>
                    <div style={bottomText}>Sign In</div>
                </div>
            )}

            <div style={navItem}>
                <div style={clockDisplay}>{time}</div>
            </div>

            <Link to="/register" style={navLink}>
                <div style={registerBtn}>Register</div>
            </Link>
        </header>
    );
};

const navContainer = { backgroundColor: '#131921', padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '20px', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' };
const logoWrapper = { padding: '5px 12px', cursor: 'pointer' };
const navItem = { display: 'flex', flexDirection: 'column', padding: '5px' };
const navLink = { textDecoration: 'none', color: '#fff' };
const navLinkPointer = { ...navLink, cursor: 'pointer', padding: '5px' };
const topText = { fontSize: '11px', color: '#aaa' };
const bottomText = { fontSize: '14px', fontWeight: '800', color: '#fff' };
const searchWrapper = { flex: 1, display: 'flex', height: '38px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#fff' };
const searchInput = { flex: 1, padding: '0 15px', border: 'none', outline: 'none', fontSize: '14px' };
const searchBtn = { padding: '0 20px', backgroundColor: '#febd69', border: 'none', cursor: 'pointer', fontSize: '18px' };
const clockDisplay = { color: '#febd69', fontWeight: '800', fontSize: '14px', padding: '6px 14px', borderRadius: '6px', backgroundColor: '#232f3e', border: '1px solid #3a4553', minWidth: '90px', textAlign: 'center' };
const registerBtn = { backgroundColor: '#febd69', color: '#111', padding: '7px 18px', borderRadius: '4px', fontWeight: '800', fontSize: '13px', border: '1px solid #a88734' };

export default Navbar;
