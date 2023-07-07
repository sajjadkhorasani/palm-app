import { BasketSlice } from '.';
import { BasketAction } from './types';

import { Product } from '@prisma/client';
import { ActionType } from '@@store/types';

export const BasketReducer = (
	state: BasketSlice,
	{ type, payload }: ActionType<keyof typeof BasketAction, Product>,
): BasketSlice => {
	switch (type) {
		case BasketAction.ADD: {
			const item = Object.keys(state.items).includes(payload.id);

			if (item) {
				return {
					...state,
					items: {
						...state.items,
						[payload.id]: {
							...payload,
							quantity: state.items[payload.id].quantity + 1,
						},
					},
				};
			}

			return {
				...state,
				items: {
					...state.items,
					[payload.id]: {
						...payload,
						quantity: 1,
					},
				},
			};
		}

		case BasketAction.REMOVE: {
			const item = Object.keys(state.items).includes(payload.id);

			if (item) {
				if (state.items[payload.id].quantity === 1) {
					const { [payload.id]: removed, ...rest } = state.items;
					return {
						...state,
						items: rest,
					};
				}

				return {
					...state,
					items: {
						...state.items,
						[payload.id]: {
							...payload,
							quantity: state.items[payload.id].quantity - 1,
						},
					},
				};
			}

			return {
				...state,
				items: state.items,
			};
		}

		default:
			return state;
	}
};
