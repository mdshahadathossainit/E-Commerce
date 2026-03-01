import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const getImageUrl = () => {
        if (product.display_image) {
            return product.display_image;
        }
        const BASE_URL = 'https://e-commerce-hmvn.onrender.com';
        if (!product.image) return 'https://via.placeholder.com/150';
        
        const imageStr = String(product.image);
        if (imageStr.startsWith('http')) return imageStr;
        
        const cleanPath = imageStr.startsWith('/') ? imageStr : `/${imageStr}`;
        return `${BASE_URL}${cleanPath}`;
    };

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px', 
            borderRadius: '12px', 
            width: '220px', 
            backgroundColor: '#fff', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
        }}>
            <img 
                src={getImageUrl()} 
                alt={product.name} 
                style={{ 
                    width: '100%', 
                    height: '160px', 
                    objectFit: 'cover', 
                    borderRadius: '8px' 
                }} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
            />
            <h3 style={{ 
                fontSize: '1.05rem', 
                margin: '12px 0 8px', 
                height: '42px', 
                overflow: 'hidden',
                color: '#333'
            }}>
                {product.name}
            </h3>
            <p style={{ 
                fontWeight: 'bold', 
                color: '#27ae60', 
                fontSize: '1.2rem',
                marginBottom: '12px'
            }}>
                ${product.price}
            </p>
            <Link 
                to={`/product/${product.slug}`} 
                style={{ 
                    display: 'block',
                    textDecoration: 'none', 
                    color: '#fff', 
                    backgroundColor: '#3498db',
                    padding: '8px 0',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontWeight: '500'
                }}
            >
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;
