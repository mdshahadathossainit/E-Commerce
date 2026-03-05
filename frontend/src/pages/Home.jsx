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

    const banners = [
        "https://m.media-amazon.com/images/I/91Ublp-YsfL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
    ];

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            
            {/* --- Final Single Navbar --- */}
            <header style={navContainer}>
                {/* Home / Logo Section */}
                <div style={logoWrapper} onClick={() => navigate('/')}>
                    <h2 style={{ color: '#fff', margin: 0, fontSize: '20px', cursor: 'pointer' }}>
                        <span style={{ color: '#febd69' }}>🏠 Home</span>
                    </h2>
                </div>

                {/* Location Area */}
                <div style={navItem}>
                    <span style={topText}>Delivering to</span>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>
                        <span style={{ marginRight: '4px' }}>📍</span> Bangladesh
                    </div>
                </div>

                {/* Search Bar */}
                <div style={searchWrapper}>
                    <select style={searchSelect}>
                        <option>All Categories</option>
                        {categories.map(cat => <option key={cat.id}>{cat.name}</option>)}
                    </select>
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={searchInput}
                    />
                    <button style={searchBtn}>🔍</button>
                </div>

                {/* Language Picker */}
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

                {/* Sign In */}
                <div onClick={() => navigate('/login')} style={navLinkPointer}>
                    <span style={topText}>Hello, User</span>
                    <div style={bottomText}>Sign In</div>
                </div>

                {/* Live Clock */}
                <div style={navItem}>
                    <div style={clockDisplay}>{time}</div>
                </div>

                {/* Final Register Button */}
                <Link to="/register" style={navLink}>
                    <div style={registerBtn}>
                        Register
                    </div>
                </Link>
            </header>

            {/* --- Banner Section --- */}
            <div style={{
                height: '400px',
                backgroundImage: `url("${banners[currentBanner]}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.8s ease-in-out',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))',
                position: 'relative'
            }}>
                <button onClick={() => setCurrentBanner(currentBanner === 0 ? banners.length - 1 : currentBanner - 1)} style={sliderNavStyle('left')}>❮</button>
                <button onClick={() => setCurrentBanner(currentBanner === banners.length - 1 ? 0 : currentBanner + 1)} style={sliderNavStyle('right')}>❯</button>
            </div>

            {/* --- Product Grid Section --- */}
            <div style={{ maxWidth: '1500px', margin: '-180px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
                {categories.map(category => {
                    const categoryProducts = filteredProducts.filter(p => p.category === category.id);
                    if (categoryProducts.length === 0) return null;

                    return (
                        <div key={category.id} id={`cat-${category.id}`} style={categorySection}>
                            <h3 style={categoryTitle}>
                                {category.name}
                            </h3>
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

            {/* --- Footer Section --- */}
            <footer style={footerStyle}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ color: '#febd69', marginBottom: '15px' }}>Md Shahadat Hossain</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <a href="https://github.com/mdshahadathossainit/" target="_blank" rel="noreferrer" style={footerLink}>Github</a>
                        <a href="https://mdshahadathossainit.github.io/" target="_blank" rel="noreferrer" style={footerLink}>Portfolio</a>
                    </div>
                    <p style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
                        © 2026 E-Commerce Project | Developed with React & Django
                    </p>
                </div>
            </footer>
        </div>
    );
};

// --- Styles ---

const navContainer = {
    backgroundColor: '#131921',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    position: 'sticky',
    top: 0,
    zIndex: 1000
};

const logoWrapper = { 
    padding: '5px 10px', 
    border: '1px solid transparent', 
    cursor: 'pointer',
    borderRadius: '4px'
};

const navItem = { display: 'flex', flexDirection: 'column', padding: '5px' };
const navLink = { textDecoration: 'none', color: '#fff' };
const navLinkPointer = { ...navLink, cursor: 'pointer', padding: '5px' };
const topText = { fontSize: '11px', color: '#ccc' };
const bottomText = { fontSize: '14px', fontWeight: 'bold', color: '#fff' };

const searchWrapper = {
    flex: 1,
    display: 'flex',
    height: '38px',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: '#fff'
};

const searchSelect = {
    backgroundColor: '#f3f3f3',
    border: 'none',
    padding: '0 10px',
    fontSize: '12px',
    borderRight: '1px solid #ccc',
    cursor: 'pointer',
    outline: 'none'
};

const searchInput = { flex: 1, padding: '0 12px', border: 'none', outline: 'none', fontSize: '14px' };

const searchBtn = {
    padding: '0 15px',
    backgroundColor: '#febd69',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px'
};

const langSelect = {
    backgroundColor: '#232f3e',
    color: '#fff',
    border: '1px solid #444',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    outline: 'none'
};

const clockDisplay = {
    color: '#febd69',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '4px 12px',
    borderRadius: '4px',
    backgroundColor: '#232f3e',
    border: '1px solid #3a4553'
};

const registerBtn = {
    backgroundColor: '#febd69',
    color: '#111',
    padding: '7px 15px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '13px',
    border: '1px solid #a88734'
};

const categorySection = { 
    marginBottom: '25px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const categoryTitle = { marginBottom: '15px', color: '#111', borderBottom: '2px solid #febd69', display: 'inline-block', paddingBottom: '4px' };
const productGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' };
const productCardWrapper = { transition: 'transform 0.2s' };

const footerStyle = { backgroundColor: '#232f3e', color: '#fff', padding: '40px 20px', marginTop: '40px', textAlign: 'center' };
const footerLink = { color: '#ccc', textDecoration: 'none', fontSize: '14px', padding: '8px 15px', border: '1px solid #444', borderRadius: '4px' };

const sliderNavStyle = (dir) => ({
    position: 'absolute', top: '45%', [dir]: '20px', backgroundColor: 'rgba(255,255,255,0.5)', 
    border: 'none', color: '#000', fontSize: '24px', width: '45px', height: '45px', cursor: 'pointer', zIndex: 20, borderRadius: '50%'
});

export default Home;
