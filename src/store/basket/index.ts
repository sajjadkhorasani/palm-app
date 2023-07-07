import { create } from 'zustand';
import { devtools, redux } from 'zustand/middleware';

import { Product } from '@prisma/client';

import { BasketReducer } from './reducer';

interface Basket {
	[key: Product['id']]: Product & {
		quantity: number;
	};
}

export interface BasketSlice {
	items: Basket;
	getQuantity: (id: Product['id']) => number;
}

const initialState: BasketSlice = {
	items: {},
	getQuantity: (id: Product['id']) => {
		const item = Object.keys(initialState.items).includes(id);

		if (item) {
			return initialState.items[id].quantity || 0;
		}

		return 0;
	},
};

export const useBasketSlice = create(devtools(redux(BasketReducer, initialState)));

export * from './actions';
