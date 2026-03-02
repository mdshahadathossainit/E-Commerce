import React, { useEffect, useState } from 'react';
import api from '../api';
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
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    useEffect(() => {
        api.get('categories/').then(res => setCategories(res.data)).catch(err => console.log(err));
        api.get('products/').then(res => setProducts(res.data)).catch(err => console.log(err));
    }, []);

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#eaeded', minHeight: '100vh' }}>
            
           
            <div style={{ backgroundColor: '#131921', padding: '10px 0', display: 'flex', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', width: '95%', maxWidth: '1000px', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ flex: 1, padding: '0 15px', border: 'none', outline: 'none', fontSize: '15px' }}
                    />
                    <button style={{ padding: '0 20px', backgroundColor: '#febd69', border: 'none', cursor: 'pointer', fontSize: '18px' }}>🔍</button>
                </div>
            </div>

            
            <div style={{ backgroundColor: '#232f3e', padding: '8px 20px', display: 'flex', gap: '20px', overflowX: 'auto' }}>
                <span style={{ color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>All</span>
                {categories.map(cat => (
                    <a key={cat.id} href={`#cat-${cat.id}`} style={{ color: '#fff', textDecoration: 'none', fontSize: '14px' }}>{cat.name}</a>
                ))}
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

            {/* ৪. ক্যাটাগরি গ্রিড উইথ ব্যাকগ্রাউন্ড ইমেজ */}
            <div style={{ maxWidth: '1500px', margin: '-180px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
                {categories.map(category => {
                    const categoryProducts = filteredProducts.filter(p => p.category === category.id);
                    if (categoryProducts.length === 0) return null;

                    return (
                        <div key={category.id} id={`cat-${category.id}`} style={{ 
                            marginBottom: '30px',
                            padding: '20px',
                            borderRadius: '8px',
                            ে
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
                    <p style={{ marginBottom: '25px', fontSize: '14px', color: '#ccc' }}>Connect with me on social platforms</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        <a href="https://github.com/mdshahadathossainit/" target="_blank" rel="noreferrer" style={footerLinkStyle}>Github</a>
                        <a href="https://mdshahadathossainit.github.io/" target="_blank" rel="noreferrer" style={footerLinkStyle}>Portfolio (GitHub.io)</a>
                        <a href="https://www.linkedin.com/in/mdshahadathossainit/" target="_blank" rel="noreferrer" style={footerLinkStyle}>LinkedIn</a>
                        <a href="https://facebook.com/your-profile" target="_blank" rel="noreferrer" style={footerLinkStyle}>Facebook</a>
                    </div>

                    <div style={{ marginTop: '40px', borderTop: '1px solid #3a4553', paddingTop: '20px', fontSize: '12px', color: '#aaa' }}>
                        © 2026 E-Commerce Project | Developed with React & Django
                    </div>
                </div>
            </footer>
        </div>
    );
};

const sliderNavStyle = (dir) => ({
    position: 'absolute', top: '40%', [dir]: '20px', backgroundColor: 'rgba(255,255,255,0.4)', 
    border: 'none', color: '#000', fontSize: '30px', width: '50px', height: '50px', cursor: 'pointer', zIndex: 20, borderRadius: '50%'
});

const footerLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 20px',
    border: '1px solid #3a4553',
    borderRadius: '4px',
    transition: '0.3s'
};

export default Home;
