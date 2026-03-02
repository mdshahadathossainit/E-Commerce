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
            {/* Amazon Style Hero Section */}
            <div style={{
                height: '300px',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0)), url("https://m.media-amazon.com/images/I/91Ublp-YsfL._SX3000_.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '20px'
            }}>
                {/* Search & Filter Bar */}
                <div style={{ 
                    display: 'flex', 
                    width: '90%', 
                    maxWidth: '800px', 
                    height: '45px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                    <select 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ 
                            padding: '0 10px', 
                            backgroundColor: '#f3f3f3', 
                            border: 'none',
                            borderRight: '1px solid #cdcdcd',
                            cursor: 'pointer'
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
                            fontSize: '16px'
                        }}
                    />
                    <button style={{
                        padding: '0 20px',
                        backgroundColor: '#febd69',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px'
                    }}>🔍</button>
                </div>
            </div>

            {/* Product Grid Layout */}
            <div style={{ 
                maxWidth: '1500px', 
                margin: '-100px auto 0', 
                padding: '0 20px',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                    gap: '20px' 
                }}>
                    {products.length > 0 ? products.map(product => (
                        <div key={product.id} style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '2px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
