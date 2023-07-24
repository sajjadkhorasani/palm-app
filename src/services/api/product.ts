import { AxiosInstance } from '../instance';

export const addNewProduct = (data: any) => AxiosInstance.post(`/products`, data);
export const editProduct = (data: any) => AxiosInstance.put(`/products`, data);
export const deleteProduct = (id: string) => AxiosInstance.delete(`/products/${id}`);
