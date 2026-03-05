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
            
            {/* --- Updated Clean Navbar --- */}
            <header style={navContainer}>
                {/* Logo */}
                <div style={logoWrapper}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h2 style={{ color: '#fff', margin: 0, fontSize: '22px' }}>
                            <span style={{ color: '#febd69' }}>My</span> E-Commerce
                        </h2>
                    </Link>
                </div>

                {/* Location */}
                <div style={navItem}>
                    <span style={topText}>Delivering to</span>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
                        <span style={{ marginRight: '4px' }}>📍</span> Bangladesh
                    </div>
                </div>

                {/* Search Bar */}
                <div style={searchWrapper}>
                    <select style={searchSelect}>
                        <option>All</option>
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

                {/* Language Switcher */}
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

                {/* Sign In Section */}
                <div onClick={() => navigate('/login')} style={navLinkPointer}>
                    <span style={topText}>Hello, User</span>
                    <div style={bottomText}>Sign In</div>
                </div>

                {/* Clock Display */}
                <div style={navItem}>
                    <div style={clockDisplay}>{time}</div>
                </div>

                {/* Register Section (Replaces Cart) */}
                <Link to="/register" style={navLink}>
                    <div style={registerBtn}>
                        Register
                    </div>
                </Link>
            </header>

            {/* --- Main Content --- */}
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

            <footer style={footerStyle}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ color: '#febd69', marginBottom: '20px' }}>Md Shahadat Hossain</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        <a href="https://github.com/mdshahadathossainit/" target="_blank" rel="noreferrer" style={footerLink}>Github</a>
                        <a href="https://mdshahadathossainit.github.io/" target="_blank" rel="noreferrer" style={footerLink}>Portfolio</a>
                    </div>
                    <div style={{ marginTop: '40px', fontSize: '12px', color: '#aaa' }}>
                        © 2026 E-Commerce Project | Developed with React & Django
                    </div>
                </div>
            </footer>
        </div>
    );
};

// --- Updated Styles ---

const navContainer = {
    backgroundColor: '#131921',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000
};

const logoWrapper = { padding: '5px' };
const navItem = { display: 'flex', flexDirection: 'column', padding: '5px' };
const navLink = { textDecoration: 'none', color: '#fff' };
const navLinkPointer = { ...navLink, cursor: 'pointer', padding: '5px' };
const topText = { fontSize: '12px', color: '#ccc' };
const bottomText = { fontSize: '15px', fontWeight: 'bold', color: '#fff' };

const searchWrapper = {
    flex: 1,
    display: 'flex',
    height: '42px',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#fff'
};

const searchSelect = {
    backgroundColor: '#f3f3f3',
    border: 'none',
    padding: '0 12px',
    borderRight: '1px solid #ccc',
    cursor: 'pointer',
    outline: 'none'
};

const searchInput = { flex: 1, padding: '0 15px', border: 'none', outline: 'none', fontSize: '15px' };

const searchBtn = {
    padding: '0 20px',
    backgroundColor: '#febd69',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px'
};

const langSelect = {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #444',
    padding: '5px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    outline: 'none'
};

const clockDisplay = {
    color: '#febd69',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '5px 15px',
    borderRadius: '6px',
    backgroundColor: '#232f3e',
    border: '1px solid #3a4553'
};

const registerBtn = {
    backgroundColor: '#febd69',
    color: '#111',
    padding: '8px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    border: '1px solid #a88734'
};

const categorySection = { 
    marginBottom: '30px',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
};

const categoryTitle = { marginBottom: '20px', color: '#111', borderBottom: '2.5px solid #febd69', display: 'inline-block', paddingBottom: '6px' };
const productGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' };
const productCardWrapper = { padding: '10px', transition: 'transform 0.2s' };

const footerStyle = { backgroundColor: '#232f3e', color: '#fff', padding: '50px 20px', marginTop: '50px', textAlign: 'center' };
const footerLink = { color: '#fff', textDecoration: 'none', fontSize: '15px', padding: '10px 20px', border: '1px solid #3a4553', borderRadius: '4px' };

const sliderNavStyle = (dir) => ({
    position: 'absolute', top: '45%', [dir]: '30px', backgroundColor: 'rgba(255,255,255,0.6)', 
    border: 'none', color: '#000', fontSize: '28px', width: '55px', height: '55px', cursor: 'pointer', zIndex: 20, borderRadius: '50%'
});

export default Home;
