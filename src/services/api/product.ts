import { AxiosInstance } from '../instance';

export const addNewProduct = async (data: any) => {
	const form = new FormData();

	form.append('image', data.image);
	form.append('name', data.name);
	form.append('description', data.description);
	form.append('price', data.price);

	return await AxiosInstance.post(`/products`, form, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};
export const editProduct = (data: any) => AxiosInstance.put(`/products`, data);
export const deleteProduct = (id: string) => AxiosInstance.delete(`/products/${id}`);
