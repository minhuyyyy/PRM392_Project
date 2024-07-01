import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:5000',
});

axiosInstance.interceptors.response.use((response) => {
    if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});
