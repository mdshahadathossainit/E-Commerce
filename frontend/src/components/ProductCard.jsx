import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const imageUrl = product.display_image || 'https://via.placeholder.com/150';

    return (
        <div style={{ 
            border: '1px solid #e0e0e0', 
            padding: '12px', 
            borderRadius: '16px', 
            backgroundColor: '#f8f9fa', 
            boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
                    height: '150px', 
                    objectFit: 'cover', 
                    borderRadius: '12px',
                    marginBottom: '10px'
                }} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
            />
            <h3 style={{ 
                fontSize: '0.95rem', 
                margin: '5px 0', 
                height: '40px', 
                overflow: 'hidden',
                color: '#2c3e50',
                lineHeight: '1.3',
                fontWeight: '600'
            }}>
                {product.name}
            </h3>
            <p style={{ 
                fontWeight: '800', 
                color: '#2ecc71', 
                fontSize: '1.1rem',
                margin: '8px 0'
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
                    padding: '10px 0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '14px',
                    marginTop: 'auto'
                }}
            >
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;
