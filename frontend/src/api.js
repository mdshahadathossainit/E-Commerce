import axios from 'axios';

const API = axios.create({
    baseURL: 'https://e-commerce-hmvn.onrender.com/api/' 
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fetchProducts = () => API.get('products/');
export const fetchCategories = () => API.get('categories/');

export default API;
