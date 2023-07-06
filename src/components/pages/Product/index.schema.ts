import { Prisma } from '@prisma/client';
import { mixed, number, object, string } from 'yup';

export interface IProductForm {
	id: string;
	image: string;
	name: string;
	description: string;
	price: number;
}

export const ProductFormDefaultValue = (product?: Prisma.ProductGetPayload<true>) => ({
	id: product?.id || null,
	image: product?.image || undefined,
	name: product?.name,
	description: product?.description,
	price: product?.price,
});

export const ProductFormSchema = object({
	id: string().nullable(),
	image: mixed().required('Image is required!'),
	name: string().required('Name is required!'),
	description: string().required('Description is required!'),
	price: number().required('Price is required!'),
});
