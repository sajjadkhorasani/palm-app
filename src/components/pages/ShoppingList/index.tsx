'use client';

import { Product } from '@prisma/client';

import { ShoppingCard } from '@@components/common';
import { addToBasket, removeFromBasket, useBasketSlice } from '@@store';
import { useMemo } from 'react';

interface ShopingListProps {
	list: Array<Product>;
}

export const ShopingList = ({ list }: ShopingListProps) => {
	const { items, dispatch } = useBasketSlice();

	const onAddToCart = (product: Product) => {
		dispatch(addToBasket(product));
	};

	const onRemoveFromCart = (product: Product) => {
		dispatch(removeFromBasket(product));
	};

	const currentList = useMemo(() => {
		return list.map((product) => {
			const item = items[product.id];
			if (item) {
				return { ...product, quantity: item.quantity };
			}

			return product;
		});
	}, [items, list]);

	return currentList.length ? (
		<>
			{currentList.map((product, index) => (
				<ShoppingCard
					key={index}
					product={product}
					onAddToCart={onAddToCart}
					onRemoveFromCard={onRemoveFromCart}
				/>
			))}
		</>
	) : (
		<h1 className="text-4xl text-black">Not Found Any Product</h1>
	);
};
