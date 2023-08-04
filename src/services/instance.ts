import axios from 'axios';
import { toastErrors } from './interceptors';

export const AxiosInstance = axios.create({
	withCredentials: true,
	baseURL: '/api',
	timeout: 10000,
	headers: {
		Accept: 'application/json ,text/plain, */*',
		'Content-Type': 'application/json',
	},
});

AxiosInstance.interceptors.request.use(undefined, toastErrors);
