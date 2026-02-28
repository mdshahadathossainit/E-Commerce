import axios from 'axios';
const API = axios.create({
    baseURL: 'https://e-commerce-hmvn.onrender.com/api'
});

export const fetchProducts = () => API.get('/products/');
export const fetchCategories = () => API.get('/categories/');
