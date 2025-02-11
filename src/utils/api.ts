import axios, { type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'https://api.bakuage.com:443',
});

// Agrega un interceptor para agregar la API key en los headers de cada request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // Obtén la API key almacenada en localStorage
    const token = localStorage.getItem('apiKey');

    if (token && config.headers) {
        // Agrega el header Authorization
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
