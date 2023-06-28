import { AxiosInstance } from '../instance';

export const editProfile = (data: any) => AxiosInstance.put('/profile', data);
