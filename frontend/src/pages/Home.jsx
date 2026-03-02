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
        <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', paddingBottom: '40px' }}>
            
            <div style={{ backgroundColor: '#131921', padding: '10px 0', display: 'flex', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', width: '95%', maxWidth: '1000px', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
                    <input 
                        type="text" 
                        placeholder="Search products by name..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ flex: 1, padding: '0 15px', border: 'none', outline: 'none', fontSize: '15px' }}
                    />
                    <button style={{ padding: '0 20px', backgroundColor: '#febd69', border: 'none', cursor: 'pointer', fontSize: '18px' }}>🔍</button>
                </div>
            </div>

            <div style={{ backgroundColor: '#232f3e', padding: '8px 20px', display: 'flex', gap: '20px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#fff', fontWeight: 'bold', cursor: 'pointer', padding: '5px' }}>All</span>
                {categories.map(cat => (
                    <a key={cat.id} href={`#cat-${cat.id}`} style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', padding: '5px' }}>
                        {cat.name}
                    </a>
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

    
            <div style={{ maxWidth: '1500px', margin: '-180px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
                {categories.map(category => {
                    const categoryProducts = filteredProducts.filter(p => p.category === category.id);
                    if (categoryProducts.length === 0) return null;

                    return (
                        <div key={category.id} id={`cat-${category.id}`} style={{ marginBottom: '30px' }}>
                            <div style={{ backgroundColor: '#fff', padding: '10px 20px', marginBottom: '10px', borderRadius: '4px' }}>
                                <h3 style={{ margin: 0, color: '#333' }}>{category.name}</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                {categoryProducts.map(product => (
                                    <div key={product.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const sliderNavStyle = (dir) => ({
    position: 'absolute', top: '40%', [dir]: '20px', backgroundColor: 'rgba(255,255,255,0.3)', 
    border: 'none', color: '#000', fontSize: '30px', padding: '10px', cursor: 'pointer', zIndex: 20, borderRadius: '50%'
});

export default Home;
