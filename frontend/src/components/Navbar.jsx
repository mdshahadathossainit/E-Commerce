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

        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem('access'));
        };

        window.addEventListener('storage', checkAuth);
        const authInterval = setInterval(checkAuth, 1000);

        return () => {
            clearInterval(clockTimer);
            clearInterval(authInterval);
            window.removeEventListener('storage', checkAuth);
        };
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
                <img 
                    src="https://imgur.com/N3dd1YI.png" 
                    alt="Talha E-Commerce" 
                    style={logoStyle} 
                />
                <h2 style={logoTextStyle}>
                    Talha <span style={{ color: '#febd69' }}>E-Commerce</span>
                </h2>
                <div style={homeLinkStyle}>
                    <span style={topText}>Explore</span>
                    <div style={bottomText}>🏠 Home</div>
                </div>
            </div>

            <div style={searchWrapper}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    style={searchInput}
                />
                <button style={searchBtn}>🔍</button>
            </div>

            <div style={navItemsGroup}>
                {isLoggedIn ? (
                    <>
                        <Link to="/cart" style={navLink}>
                            <div style={bottomText}>🛒 Cart</div>
                        </Link>

                        <Link to="/profile" style={navLink}>
                            <div style={bottomText}>👤 Profile</div>
                        </Link>

                        <div onClick={handleLogout} style={navLinkPointer}>
                            <div style={{...bottomText, color: '#ff4d4d'}}>Logout</div>
                        </div>
                    </>
                ) : (
                    <div onClick={() => navigate('/login')} style={navLinkPointer}>
                        <div style={bottomText}>Sign In</div>
                    </div>
                )}

                {!isLoggedIn && (
                    <Link to="/register" style={navLink}>
                        <div style={registerBtn}>Register</div>
                    </Link>
                )}
            </div>
        </header>
    );
};

const navContainer = { 
    backgroundColor: '#131921', 
    padding: '10px 15px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    position: 'sticky', 
    top: 0, 
    zIndex: 1000, 
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
};

const logoWrapper = { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    cursor: 'pointer'
};

const logoStyle = { 
    height: '35px', 
    width: '35px', 
    borderRadius: '50%', 
    objectFit: 'cover',
    border: '1px solid #febd69' 
};

const logoTextStyle = { 
    color: '#fff', 
    margin: 0, 
    fontSize: '16px', 
    fontWeight: 'bold'
};

const homeLinkStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5px',
    paddingLeft: '10px',
    borderLeft: '1px solid #444'
};

const navItemsGroup = { display: 'flex', alignItems: 'center', gap: '10px' };
const navLink = { textDecoration: 'none', color: '#fff', display: 'flex', flexDirection: 'column' };
const navLinkPointer = { ...navLink, cursor: 'pointer' };
const topText = { fontSize: '10px', color: '#aaa' };
const bottomText = { fontSize: '13px', fontWeight: 'bold', color: '#fff' };
const searchWrapper = { flex: '1', minWidth: '150px', display: 'flex', height: '35px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#fff', order: 3, width: '100%' };
const searchInput = { flex: 1, padding: '0 10px', border: 'none', outline: 'none', fontSize: '14px', width: '100%' };
const searchBtn = { padding: '0 15px', backgroundColor: '#febd69', border: 'none', cursor: 'pointer' };
const clockDisplay = { color: '#febd69', fontWeight: '800', fontSize: '12px', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#232f3e' };
const registerBtn = { backgroundColor: '#febd69', color: '#111', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' };

export default Navbar;
