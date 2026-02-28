import axios from 'axios';

const api = axios.create({
    baseURL: 'https://e-commerce-hmvn.onrender.com/api/', 
});

export default api;
