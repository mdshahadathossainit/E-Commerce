import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        api.get('categories/').then(res => setCategories(res.data));
    }, []);

    useEffect(() => {
        let url = `products/?search=${search}`;
        if (selectedCategory) {
            url += `&category=${selectedCategory}`;
        }
        api.get(url).then(res => setProducts(res.data));
    }, [search, selectedCategory]);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: '8px', width: '300px' }}
                />
                <select 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: '8px' }}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {products.length > 0 ? products.map(product => (
                    <ProductCard key={product.id} product={product} />
                )) : <p>No products found.</p>}
            </div>
        </div>
    );
};

export default Home;
