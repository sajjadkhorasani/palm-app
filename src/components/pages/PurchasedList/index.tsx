'use client';

import { Product } from '@prisma/client';

import { BasketCard } from '@@components';

interface PurchasedListProps {
	cart?: Product[];
}

export const PurchasedList = ({ cart }: PurchasedListProps) => {
	console.log('🚀', cart);
	// return cart?.length ? (
	// 	cart.map((cartItem, index) => <BasketCard key={index} basketItem={cartItem as any} />)
	// ) : (
	return <h1 className="flex self-center text-4xl text-black">Your Cart is Empty</h1>;
	// );
};
