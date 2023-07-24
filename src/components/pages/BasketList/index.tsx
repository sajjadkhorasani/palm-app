'use client';

import { Button } from '@material-tailwind/react';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';

import API from '@@services';
import { BasketCard, Typography } from '@@components';
import { addToBasket, removeFromBasket, useBasketSlice } from '@@store';
import clsx from 'clsx';

export const BasketList = () => {
	const router = useRouter();
	const { items, dispatch } = useBasketSlice();

	const onCheckout = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			await API.checkoutBasket(Object.values(items));
			router.push('/purchased');
		} catch (error) {}
	};

	const onAddToCart = (product: Product) => {
		dispatch(addToBasket(product));
	};

	const onRemoveFromCart = (product: Product) => {
		dispatch(removeFromBasket(product));
	};

	return (
		<div
			className={clsx(
				'relative container mx-auto flex flex-row flex-wrap backdrop-blur-lg grow gap-8 px-8 py-10',
				{
					'justify-start items-start': Object.keys(items).length,
					'justify-center items-center': !Object.keys(items).length,
				},
			)}
		>
			{Object.keys(items).length ? (
				<>
					{Object.values(items).map((basketItem, index) => (
						<BasketCard
							key={index}
							basketItem={basketItem}
							onAddToCart={onAddToCart}
							onRemoveFromCard={onRemoveFromCart}
						/>
					))}
					<hr className="w-full border-b border-gray-600" />
					<div className="flex flex-row justify-between items-center gap-4">
						<Typography as="h2" variant="h2">
							Total: $
							{Object.values(items)
								.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
								.toFixed(2)}
						</Typography>
						<Button onClick={onCheckout}>Checkout</Button>
					</div>
				</>
			) : (
				<h1 className="text-4xl text-black">Your Basket is Empty</h1>
			)}
		</div>
	);
};
