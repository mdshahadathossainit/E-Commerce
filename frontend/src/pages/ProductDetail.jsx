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
        <div style={{ padding: '20px' }}>
            <img src={product.image} alt={product.name} style={{ width: '300px' }} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h3>Price: ${product.price}</h3>
            <button onClick={addToCart} style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none' }}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetail;
