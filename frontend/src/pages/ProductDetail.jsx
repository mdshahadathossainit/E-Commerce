import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`products/${slug}/`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [slug]);

    const addToCart = async () => {
        const token = localStorage.getItem('access');
        if (!token) {
            alert("Please login first!");
            return;
        }
        try {
            await api.post('cart/add_to_cart/', { product_id: product.id, quantity: 1 }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Product added to cart!");
        } catch (error) {
            alert("Failed to add product.");
        }
    };

    if (!product) return <div style={{ padding: '20px' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
                <img 
                    src={product.display_image} 
                    alt={product.name} 
                    style={{ width: '400px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
                />
                <div>
                    <h1>{product.name}</h1>
                    <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>{product.description}</p>
                    <h2 style={{ color: '#27ae60' }}>Price: ${product.price}</h2>
                    <button 
                        onClick={addToCart} 
                        style={{ padding: '12px 30px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
