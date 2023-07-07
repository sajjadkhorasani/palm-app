import { Product } from '@prisma/client';

import { AxiosInstance } from '../instance';

export const checkoutBasket = (data: Product[]) =>
	AxiosInstance.post('/purchase', {
		list: data,
	});
