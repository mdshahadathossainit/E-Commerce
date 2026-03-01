import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const BASE_URL = 'https://e-commerce-hmvn.onrender.com';

    const getImageUrl = () => {
        if (!product.image) return 'https://via.placeholder.com/150'; 
        if (product.image.startsWith('http')) return product.image;
        
        const imagePath = product.image.startsWith('/') ? product.image : `/${product.image}`;
        return `${BASE_URL}${imagePath}`;
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px', width: '200px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <img 
                src={getImageUrl()} 
                alt={product.name} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
            />
            <h3 style={{ fontSize: '1.1rem', margin: '10px 0', height: '40px', overflow: 'hidden' }}>{product.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#2c3e50' }}>Price: ${product.price}</p>
            <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: '500' }}>
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;
