import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [currentBanner, setCurrentBanner] = useState(0);

    const banners = [
        "https://m.media-amazon.com/images/I/91Ublp-YsfL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
    ];

    useEffect(() => {
        const bannerTimer = setInterval(() => {
            setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(bannerTimer);
    }, [banners.length]);

    useEffect(() => {
        api.get('categories/').then(res => setCategories(res.data)).catch(err => console.log(err));
        api.get('products/').then(res => setProducts(res.data)).catch(err => console.log(err));
    }, []);

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
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

            <div style={{ maxWidth: '1400px', margin: '-150px auto 0', padding: '0 15px', position: 'relative', zIndex: 10 }}>
                {categories.map((category) => {
                    const categoryProducts = filteredProducts.filter(p => String(p.category) === String(category.id));
                    if (categoryProducts.length === 0) return null;

                    return (
                        <div key={category.id} id={`cat-${category.id}`} style={categorySection}>
                            <div style={categoryHeader}>
                                <h3 style={categoryTitle}>{category.name}</h3>
                            </div>
                            <div style={productGrid}>
                                {categoryProducts.map(product => (
                                    <div key={product.id}>
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
                        <a href="https://www.linkedin.com/in/mdshahadathossainit" target="_blank" rel="noreferrer" style={footerLink}>LinkedIn Profile</a>
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

const categorySection = { 
    marginBottom: '40px', 
    padding: '20px', 
    borderRadius: '16px', 
    backgroundColor: '#ffffff', 
    boxShadow: '0 10px 25px rgba(0,0,0,0.06)' 
};

const categoryHeader = { 
    marginBottom: '20px', 
    paddingBottom: '10px', 
    borderBottom: '2px solid #f0f0f0' 
};

const categoryTitle = { 
    margin: 0, 
    color: '#1a1a1a', 
    fontSize: '22px', 
    fontWeight: '800' 
};

const productGrid = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', 
    gap: '12px' 
};

const footerStyle = { backgroundColor: '#232f3e', color: '#fff', padding: '60px 20px', marginTop: '60px', textAlign: 'center' };
const footerLink = { color: '#fff', textDecoration: 'none', fontSize: '15px', padding: '12px 25px', border: '1px solid #3a4553', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)' };
const sliderNavStyle = (dir) => ({ position: 'absolute', top: '45%', [dir]: '20px', backgroundColor: 'rgba(255,255,255,0.7)', border: 'none', color: '#111', fontSize: '28px', width: '50px', height: '50px', cursor: 'pointer', zIndex: 20, borderRadius: '50%' });

export default Home;
