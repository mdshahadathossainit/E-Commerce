import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
            <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>{product.category_name}</p>
            <p>Price: ${product.price}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
