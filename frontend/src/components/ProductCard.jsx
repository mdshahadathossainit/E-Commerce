import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const BASE_URL = 'https://e-commerce-hmvn.onrender.com';

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px', width: '200px', backgroundColor: '#fff' }}>
          
            <img 
                src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`} 
                alt={product.name} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
            />
            <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.name}</h3>
            <p style={{ fontWeight: 'bold' }}>Price: ${product.price}</p>
            <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: '500' }}>
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;
