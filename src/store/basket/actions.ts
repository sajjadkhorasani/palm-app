import { Product } from '@prisma/client';
import { BasketAction } from './types';

export const addToBasket = (payload: Product) => {
	return {
		type: BasketAction.ADD as keyof typeof BasketAction,
		payload,
	};
};

export const removeFromBasket = (payload: Product) => {
	return {
		type: BasketAction.REMOVE as keyof typeof BasketAction,
		payload,
	};
};
