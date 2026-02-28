import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px', width: '200px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'blue' }}>
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;
