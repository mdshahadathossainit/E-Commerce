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
            

            <div style={{ backgroundColor: '#232f3e', padding: '10px 20px', display: 'flex', gap: '15px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: '1px solid transparent', padding: '5px' }}>All</span>
                {categories.map(cat => (
                    <a 
                        key={cat.id} 
                        href={`#section-${cat.slug}`} 
                        style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', padding: '5px', border: '1px solid transparent' }}
                        onMouseOver={(e) => e.target.style.border = '1px solid #fff'}
                        onMouseOut={(e) => e.target.style.border = '1px solid transparent'}
                    >
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
            }}></div>

            <div style={{ maxWidth: '1500px', margin: '-180px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>
                {categories.map(category => {
                    const categoryProducts = filteredProducts.filter(p => p.category === category.id);
                    
                    if (categoryProducts.length === 0) return null;

                    return (
                        <div key={category.id} id={`section-${category.slug}`} style={{ marginBottom: '40px' }}>
                            <div style={{ backgroundColor: '#fff', padding: '15px 20px', marginBottom: '10px', borderRadius: '4px' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#111' }}>{category.name}</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                {categoryProducts.map(product => (
                                    <div key={product.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {filteredProducts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#fff' }}>
                        <p>No products found for "{search}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
