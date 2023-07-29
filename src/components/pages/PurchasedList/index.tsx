'use client';

import { Product } from '@prisma/client';

import { BasketCard } from '@@components';

interface PurchasedListProps {
	cart?: {
		product: Product;
		quantity: number;
	}[];
}

export const PurchasedList = ({ cart }: PurchasedListProps) => {
	const finalCart = cart?.flat();

	return finalCart?.length ? (
		<div className='flex flex-col justify-start items-stretch grow' >
			{finalCart.map(({ product, quantity }, index) => {
				return <BasketCard key={index} basketItem={{ ...product, quantity } as any} />;
			})}
		</div>
	) : (
		<h1 className="flex self-center text-4xl text-black">Your Cart is Empty</h1>
	);
};
