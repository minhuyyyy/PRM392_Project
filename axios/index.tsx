import { getUser } from '@/helpers/async-storage-helpers/user-helpers';
import axios from 'axios';

// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.3:5000',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getUser();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        return Promise.reject(error);
    },
);
