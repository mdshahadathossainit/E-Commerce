import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        api.get('categories/').then(res => setCategories(res.data)).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        let url = `products/?search=${search}`;
        if (selectedCategory) {
            url += `&category=${selectedCategory}`;
        }
        api.get(url).then(res => setProducts(res.data)).catch(err => console.log(err));
    }, [search, selectedCategory]);

    return (
        <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', paddingBottom: '40px' }}>
            
            {/* 1. Top Search Bar Section (Separate from Banner) */}
            <div style={{ 
                backgroundColor: '#131921', 
                padding: '10px 0', 
                display: 'flex', 
                justifyContent: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ 
                    display: 'flex', 
                    width: '95%', 
                    maxWidth: '1200px', 
                    height: '40px',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    <select 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ 
                            padding: '0 10px', 
                            backgroundColor: '#f3f3f3', 
                            border: 'none',
                            borderRight: '1px solid #cdcdcd',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        <option value="">All</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.slug}>{cat.name}</option>
                        ))}
                    </select>
                    <input 
                        type="text" 
                        placeholder="Search from store..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ 
                            flex: 1, 
                            padding: '0 15px', 
                            border: 'none', 
                            outline: 'none',
                            fontSize: '15px'
                        }}
                    />
                    <button style={{
                        padding: '0 15px',
                        backgroundColor: '#febd69',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }}>🔍</button>
                </div>
            </div>

            {/* 2. Amazon Style Hero Banner (Now below Search Bar) */}
            <div style={{
                height: '400px', // ব্যানার হাইট একটু বাড়ানো হয়েছে
                backgroundImage: 'url("https://m.media-amazon.com/images/I/91Ublp-YsfL._SX3000_.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))', // নিচ থেকে ফেড আউট হবে
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))'
            }}>
            </div>

            {/* 3. Product Grid Layout (Overlapping effect) */}
            <div style={{ 
                maxWidth: '1500px', 
                margin: '-180px auto 0', // গ্রিডটি ব্যানারের উপরে উঠে আসবে
                padding: '0 20px',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '20px' 
                }}>
                    {products.length > 0 ? products.map(product => (
                        <div key={product.id} style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '4px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                        }}>
                            <ProductCard product={product} />
                        </div>
                    )) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', backgroundColor: '#fff' }}>
                            <p>No products found. Please try another search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
