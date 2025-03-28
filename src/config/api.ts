import { enviroments } from '@/config';
import axios, { type InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
    baseURL: enviroments.services.baseUrl,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('apiKey');

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});