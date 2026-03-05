import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const imageUrl = product.display_image || 'https://via.placeholder.com/150';

    return (
        <div style={{ 
            border: '1px solid #e0e0e0', 
            padding: '10px', 
            borderRadius: '16px', 
            backgroundColor: '#f8f9fa', 
            boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box'
        }}>
            <img 
                src={imageUrl} 
                alt={product.name} 
                style={{ 
                    width: '100%', 
                    height: '140px', 
                    objectFit: 'cover', 
                    borderRadius: '12px',
                    marginBottom: '8px'
                }} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
            />
            <h3 style={{ 
                fontSize: '0.9rem', 
                margin: '5px 0', 
                height: '38px', 
                overflow: 'hidden',
                color: '#2c3e50',
                lineHeight: '1.2',
                fontWeight: '600'
            }}>
                {product.name}
            </h3>
            <p style={{ 
                fontWeight: '800', 
                color: '#2ecc71', 
                fontSize: '1.1rem',
                margin: '5px 0'
            }}>
                ${product.price}
            </p>
            <Link 
                to={`/product/${product.slug}`} 
                style={{ 
                    display: 'block',
                    textDecoration: 'none', 
                    color: '#fff', 
                    backgroundColor: '#131921',
                    padding: '8px 0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '13px',
                    marginTop: 'auto'
                }}
            >
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;
