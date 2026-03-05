import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const imageUrl = product.display_image || 'https://via.placeholder.com/150';

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            margin: '5px', 
            borderRadius: '12px', 
            width: 'calc(50% - 10px)',
            maxWidth: '220px',
            boxSizing: 'border-box',
            backgroundColor: '#fff', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            display: 'inline-block',
            verticalAlign: 'top'
        }}>
            <img 
                src={imageUrl} 
                alt={product.name} 
                style={{ 
                    width: '100%', 
                    height: '140px', 
                    objectFit: 'cover', 
                    borderRadius: '8px' 
                }} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
            />
            <h3 style={{ 
                fontSize: '0.9rem', 
                margin: '10px 0 5px', 
                height: '38px', 
                overflow: 'hidden',
                color: '#333'
            }}>
                {product.name}
            </h3>
            <p style={{ 
                fontWeight: 'bold', 
                color: '#27ae60', 
                fontSize: '1.1rem',
                marginBottom: '10px'
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
                    padding: '6px 0',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: '13px'
                }}
            >
                Details
            </Link>
        </div>
    );
};

export default ProductCard;
