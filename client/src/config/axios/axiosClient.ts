import { TOKEN } from '@/models/constants/common';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import { Cookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = (baseURL: string) => {
    const axiosClient = axios.create({
        baseURL,
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
        },
        paramsSerializer: params => queryString.stringify(params),
    });
    axiosClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
        const cookies = new Cookies();
        const token = cookies.get(TOKEN);

        if (token) {
            const exp = jwtDecode(token).exp;
            // Remove when expired
            if (exp && Date.now() >= exp * 1000) {
                cookies.remove(TOKEN);
                return config;
            }

            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });
    axiosClient.interceptors.response.use(
        (response: AxiosResponse) => {
            if (response && response.data) {
                return response.data;
            }
            if (typeof response.data === 'boolean') {
                return response.data;
            }
            if (response.status === 204 && response.config.method === 'get') {
                return {
                    pageNumber: 1,
                    pageSize: 10,
                    results: [],
                    totalNumberOfPages: 0,
                    totalNumberOfRecords: 0,
                };
            }
            return response;
        },
        error => {
            // Handle errors
            throw error;
        }
    );

    return axiosClient;
};

const axiosInstanceJfw = axiosInstance(import.meta.env.VITE_JFW_API);
const axiosInstanceVardytest = axiosInstance(import.meta.env.VITE_VARDYTEST_API);

const axiosInstanceBookingDoctor = axiosInstance(import.meta.env.VITE_BOOKING_DOCTOR_API);

export { axiosInstanceBookingDoctor, axiosInstanceJfw, axiosInstanceVardytest };
