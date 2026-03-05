import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    const banners = [
        "https://m.media-amazon.com/images/I/91Ublp-YsfL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
    ];

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
    }, [banners.length]);

    useEffect(() => {
        api.get('categories/').then(res => setCategories(res.data)).catch(err => console.log(err));
        api.get('products/').then(res => setProducts(res.data)).catch(err => console.log(err));
    }, []);

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            
            <header style={navContainer}>
                <div style={logoWrapper}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h2 style={{ color: '#fff', margin: 0, fontSize: '22px' }}>
                            <span style={{ color: '#febd69' }}>My</span> E-Commerce
                        </h2>
                    </Link>
                </div>

                <div style={navItem}>
                    <span style={topText}>Delivering to</span>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
                        <span style={{ marginRight: '4px' }}>📍</span> Bangladesh
                    </div>
                </div>

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

                <div style={navItem}>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
                        <span style={{ marginRight: '5px' }}>🇧🇩</span> BN
                    </div>
                </div>

                <Link to="/profile" style={navLink}>
                    <span style={topText}>Hello, Sign in</span>
                    <div style={bottomText}>Account & Lists</div>
                </Link>

                <Link to="/profile" style={navLink}>
                    <span style={topText}>Returns</span>
                    <div style={bottomText}>& Orders</div>
                </Link>

                <div style={navItem}>
                    <div style={clockDisplay}>{time}</div>
                </div>

                <Link to="/cart" style={navLink}>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <span style={{ fontSize: '26px' }}>🛒</span>
                        <span style={cartCount}>0</span>
                        <span style={{ ...bottomText, marginLeft: '5px', marginTop: '10px' }}>Cart</span>
                    </div>
                </Link>
            </header>

            <div style={subNavbar}>
                <span style={subNavLink}>☰ All</span>
                <span style={subNavLink}>Today's Deals</span>
                <span style={subNavLink}>Customer Service</span>
                <span style={subNavLink}>Registry</span>
                <span style={subNavLink}>Gift Cards</span>
                <span style={subNavLink}>Sell</span>
            </div>

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
                        <div key={category.id} id={`cat-${category.id}`} style={{ 
                            marginBottom: '30px',
                            padding: '20px',
                            borderRadius: '8px',
                            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png"), linear-gradient(135deg, #ffffff 0%, #f3f3f3 100%)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{ marginBottom: '15px', color: '#111', borderBottom: '2px solid #febd69', display: 'inline-block', paddingBottom: '5px' }}>
                                {category.name}
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                {categoryProducts.map(product => (
                                    <div key={product.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <footer style={{ backgroundColor: '#232f3e', color: '#fff', padding: '40px 20px', marginTop: '50px', textAlign: 'center' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ color: '#febd69', marginBottom: '20px' }}>Md Shahadat Hossain</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        <a href="https://github.com/mdshahadathossainit/" target="_blank" rel="noreferrer" style={footerLinkStyle}>Github</a>
                        <a href="https://mdshahadathossainit.github.io/" target="_blank" rel="noreferrer" style={footerLinkStyle}>Portfolio</a>
                        <a href="https://www.linkedin.com/in/mdshahadathossainit/" target="_blank" rel="noreferrer" style={footerLinkStyle}>LinkedIn</a>
                        <a href="https://facebook.com/mdshahadathossainit" target="_blank" rel="noreferrer" style={footerLinkStyle}>Facebook</a>
                    </div>
                    <div style={{ marginTop: '40px', fontSize: '12px', color: '#aaa' }}>
                        © 2026 E-Commerce Project | Developed with React & Django
                    </div>
                </div>
            </footer>
        </div>
    );
};

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

const logoWrapper = { padding: '5px', cursor: 'pointer' };
const navItem = { display: 'flex', flexDirection: 'column', padding: '5px', cursor: 'pointer' };
const navLink = { textDecoration: 'none', display: 'flex', flexDirection: 'column', padding: '5px', color: '#fff' };
const topText = { fontSize: '12px', color: '#ccc' };
const bottomText = { fontSize: '14px', fontWeight: 'bold' };

const searchWrapper = {
    flex: 1,
    display: 'flex',
    height: '40px',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: '#fff'
};

const searchSelect = {
    backgroundColor: '#f3f3f3',
    border: 'none',
    padding: '0 10px',
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

const clockDisplay = {
    color: '#febd69',
    fontWeight: 'bold',
    fontSize: '15px',
    border: '1px solid #444',
    padding: '5px 12px',
    borderRadius: '4px',
    backgroundColor: '#232f3e',
    minWidth: '85px',
    textAlign: 'center'
};

const cartCount = {
    position: 'absolute',
    top: '-8px',
    left: '10px',
    backgroundColor: '#131921',
    color: '#f90',
    fontWeight: 'bold',
    fontSize: '14px',
    width: '18px',
    height: '18px',
    textAlign: 'center',
    borderRadius: '50%'
};

const subNavbar = {
    backgroundColor: '#232f3e',
    padding: '8px 20px',
    display: 'flex',
    gap: '20px',
    color: '#fff',
    fontSize: '14px',
    overflowX: 'auto'
};

const subNavLink = { cursor: 'pointer', whiteSpace: 'nowrap' };

const sliderNavStyle = (dir) => ({
    position: 'absolute', top: '40%', [dir]: '20px', backgroundColor: 'rgba(255,255,255,0.4)', 
    border: 'none', color: '#000', fontSize: '30px', width: '50px', height: '50px', cursor: 'pointer', zIndex: 20, borderRadius: '50%'
});

const footerLinkStyle = {
    color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '10px 20px', border: '1px solid #3a4553', borderRadius: '4px'
};

export default Home;
