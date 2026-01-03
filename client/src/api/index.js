import axios from 'axios';

export const API = axios.create({ baseURL: 'https://kabul-restaurant-app.onrender.com/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userInfo')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
    }
    return req;
});

export const fetchFoodItems = () => API.get('/food');
export const signIn = (formData) => API.post('/users/login', formData);
export const signUp = (formData) => API.post('/users', formData);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchOrderById = (id) => API.get(`/orders/${id}`);
export const sendMessage = (messageData) => API.post('/contact', messageData);
export const verifyUser = (token) => API.get(`/users/verify/${token}`);
