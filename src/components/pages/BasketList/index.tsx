'use client';

import clsx from 'clsx';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';

import API from '@@services';
import { useAxios } from '@@hooks';
import { Button, BasketCard, Typography } from '@@components';
import { addToBasket, clearBasket, removeFromBasket, useBasketSlice } from '@@store';

export const BasketList = () => {
	const router = useRouter();
	const { fetch, loading } = useAxios(API.checkoutBasket);
	const { items, dispatch } = useBasketSlice();

	const onCheckout = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			await fetch(Object.values(items));
			dispatch(clearBasket(null as any));
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
			className={clsx('relative container mx-auto flex flex-col grow gap-8 px-8 py-10', {
				'justify-start items-start': Object.keys(items).length,
				'justify-center items-center': !Object.keys(items).length,
			})}
		>
			<div className="flex flex-col justify-start items-stretch grow">
				{Object.keys(items).length ? (
					Object.values(items).map((basketItem, index) => (
						<BasketCard
							key={index}
							basketItem={basketItem}
							onAddToCart={onAddToCart}
							onRemoveFromCard={onRemoveFromCart}
						/>
					))
				) : (
					<h1 className="text-4xl text-black">Your Basket is Empty</h1>
				)}
			</div>

			{Object.keys(items).length ? (
				<div className="sticky bottom-0 left-0 flex flex-col justify-start items-stretch self-stretch gap-8">
					<hr className="w-full border-b border-gray-600" />
					<div className="flex flex-row justify-between items-center gap-4">
						<Typography as="h2" variant="h2">
							Total: $
							{Object.values(items)
								.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
								.toFixed(2)}
						</Typography>
						<Button loading={loading} onClick={onCheckout}>
							Checkout
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
};
