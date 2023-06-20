import { AxiosInstance } from '../instance';

export const signIn = (data: any) => AxiosInstance.post('/signin', data);
export const signUp = (data: any) => AxiosInstance.post('/signup', data);
