import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [language, setLanguage] = useState('EN');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
    const navigate = useNavigate();

    useEffect(() => {
        const clockTimer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        const bannerTimer = setInterval(() => {
            setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => {
            clearInterval(clockTimer);
            clearInterval(bannerTimer);
        };
    }, []);

    useEffect(() => {
        api.get('categories/').then(res => setCategories(res.data)).catch(err => console.log(err));
        api.get('products/').then(res => setProducts(res.data)).catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsLoggedIn(false);
        alert('Logged Out Successfully');
        navigate('/login');
    };

    const banners = [
        "https://m.media-amazon.com/images/I/91Ublp-YsfL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
    ];

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
            
            <header style={navContainer}>
                <div style={logoWrapper} onClick={() => navigate('/')}>
                    <h2 style={{ color: '#fff', margin: 0, fontSize: '20px', cursor: 'pointer' }}>
                        <span style={{ color: '#febd69' }}>🏠 Home</span>
                    </h2>
                </div>

                <div style={navItem}>
                    <span style={topText}>Delivering to</span>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>
                        <span style={{ marginRight: '4px' }}>📍</span> Bangladesh
                    </div>
                </div>

                <div style={searchWrapper}>
                    <select style={searchSelect}>
                        <option>All</option>
                        {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
                    </select>
                    <input 
                        type="text" 
                        placeholder="Search for amazing products..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={searchInput}
                    />
                    <button style={searchBtn}>🔍</button>
                </div>

                <div style={navItem}>
                    <select 
                        style={langSelect} 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="EN">🇺🇸 EN</option>
                        <option value="BN">🇧🇩 BN</option>
                    </select>
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

            <div style={{
                height: '420px',
                backgroundImage: `url("${banners[currentBanner]}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.8s ease-in-out',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0))',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0))',
                position: 'relative'
            }}>
                <button onClick={() => setCurrentBanner(currentBanner === 0 ? banners.length - 1 : currentBanner - 1)} style={sliderNavStyle('left')}>❮</button>
                <button onClick={() => setCurrentBanner(currentBanner === banners.length - 1 ? 0 : currentBanner + 1)} style={sliderNavStyle('right')}>❯</button>
            </div>

            <div style={{ maxWidth: '1400px', margin: '-150px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
                {categories.map((category, idx) => {
                    const categoryProducts = filteredProducts.filter(p => p.category === category.id);
                    if (categoryProducts.length === 0) return null;

                    const bgColors = ['#ffffff', '#f9f9f9', '#fffafa', '#f0f8ff'];
                    const accentColors = ['#febd69', '#3498db', '#e74c3c', '#2ecc71'];

                    return (
                        <div key={category.id} id={`cat-${category.id}`} style={{
                            ...categorySection,
                            backgroundColor: bgColors[idx % bgColors.length],
                            borderTop: `4px solid ${accentColors[idx % accentColors.length]}`
                        }}>
                            <div style={categoryHeader}>
                                <h3 style={categoryTitle}>{category.name}</h3>
                                <Link to="/" style={viewMore}>View More Items →</Link>
                            </div>
                            <div style={productGrid}>
                                {categoryProducts.map(product => (
                                    <div key={product.id} style={productCardWrapper}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <footer style={footerStyle}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ color: '#febd69', marginBottom: '20px' }}>Md Shahadat Hossain</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        <a href="https://github.com/mdshahadathossainit/" target="_blank" rel="noreferrer" style={footerLink}>Github Profile</a>
                        <a href="https://mdshahadathossainit.github.io/" target="_blank" rel="noreferrer" style={footerLink}>Project Portfolio</a>
                    </div>
                    <p style={{ marginTop: '40px', fontSize: '13px', color: '#999' }}>
                        © 2026 E-Commerce Platform | Integrated with Django REST & React
                    </p>
                </div>
            </footer>
        </div>
    );
};

const navContainer = {
    backgroundColor: '#131921',
    padding: '10px 25px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
};

const logoWrapper = { padding: '5px 12px', cursor: 'pointer', borderRadius: '4px' };
const navItem = { display: 'flex', flexDirection: 'column', padding: '5px' };
const navLink = { textDecoration: 'none', color: '#fff' };
const navLinkPointer = { ...navLink, cursor: 'pointer', padding: '5px' };
const topText = { fontSize: '11px', color: '#aaa', fontWeight: '500' };
const bottomText = { fontSize: '14px', fontWeight: '800', color: '#fff' };

const searchWrapper = {
    flex: 1,
    display: 'flex',
    height: '42px',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    border: '2px solid transparent',
    transition: '0.3s'
};

const searchSelect = {
    backgroundColor: '#f3f3f3',
    border: 'none',
    padding: '0 12px',
    fontSize: '13px',
    borderRight: '1px solid #ddd',
    cursor: 'pointer',
    outline: 'none',
    color: '#555'
};

const searchInput = { flex: 1, padding: '0 15px', border: 'none', outline: 'none', fontSize: '15px' };

const searchBtn = {
    padding: '0 22px',
    backgroundColor: '#febd69',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background 0.2s'
};

const langSelect = {
    backgroundColor: '#232f3e',
    color: '#fff',
    border: '1px solid #444',
    padding: '5px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    outline: 'none'
};

const clockDisplay = {
    color: '#febd69',
    fontWeight: '800',
    fontSize: '14px',
    padding: '6px 14px',
    borderRadius: '6px',
    backgroundColor: '#232f3e',
    border: '1px solid #3a4553',
    minWidth: '90px',
    textAlign: 'center',
    boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)'
};

const registerBtn = {
    backgroundColor: '#febd69',
    color: '#111',
    padding: '8px 20px',
    borderRadius: '6px',
    fontWeight: '800',
    fontSize: '14px',
    border: '1px solid #a88734',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    transition: '0.2s'
};

const categorySection = { 
    marginBottom: '40px',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
    transition: 'transform 0.3s ease'
};

const categoryHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee'
};

const categoryTitle = { 
    margin: 0,
    color: '#1a1a1a', 
    fontSize: '22px',
    fontWeight: '800'
};

const viewMore = {
    fontSize: '14px',
    color: '#007185',
    textDecoration: 'none',
    fontWeight: '600'
};

const productGrid = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '25px' 
};

const productCardWrapper = { 
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
};

const footerStyle = { 
    backgroundColor: '#232f3e', 
    color: '#fff', 
    padding: '60px 20px', 
    marginTop: '60px', 
    textAlign: 'center' 
};

const footerLink = { 
    color: '#fff', 
    textDecoration: 'none', 
    fontSize: '15px', 
    padding: '12px 25px', 
    border: '1px solid #3a4553', 
    borderRadius: '6px',
    transition: '0.3s',
    backgroundColor: 'rgba(255,255,255,0.05)'
};

const sliderNavStyle = (dir) => ({
    position: 'absolute', top: '45%', [dir]: '30px', backgroundColor: 'rgba(255,255,255,0.7)', 
    border: 'none', color: '#111', fontSize: '28px', width: '55px', height: '55px', cursor: 'pointer', zIndex: 20, borderRadius: '50%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
});

export default Home;
