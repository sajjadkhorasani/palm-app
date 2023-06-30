import { AxiosRequestConfig } from 'axios';

import { AxiosInstance } from '../instance';

export const uploadFile = (data: any, config?: AxiosRequestConfig) => AxiosInstance.post('/upload', data, config);
