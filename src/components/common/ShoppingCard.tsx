'use client';

import Image from 'next/image';
import { Product } from '@prisma/client';
import { useCallback } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

interface ShoppingCardProps {
	product: Product & { quantity?: number };
	onAddToCart: (product: Product) => void;
	onRemoveFromCard: (product: Product) => void;
}

export const ShoppingCard = ({ product, onAddToCart, onRemoveFromCard }: ShoppingCardProps) => {
	const onClickHandler = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			onAddToCart(product);
		},
		[onAddToCart, product],
	);

	const onRemoveHandler = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			onRemoveFromCard(product);
		},
		[onRemoveFromCard, product],
	);

	return (
		<Card className="mt-6 w-96">
			<CardHeader color="blue-gray" className="relative h-56">
				<Image
					width="352"
					height="235"
					src={product?.image || `/upload/${product?.id}.png` || '/default-product.png'}
					alt="product image"
				/>
			</CardHeader>
			<CardBody>
				<Typography variant="h5" color="blue-gray" className="mb-2">
					{product.name}
				</Typography>
				<Typography>{product.description}</Typography>
			</CardBody>
			<CardFooter className="pt-0">
				{product.quantity ? (
					<div className="flex flex-row justify-center items-center grow">
						<Button onClick={onClickHandler}>
							<PlusIcon className="w-5 h-5" />
						</Button>
						<Typography className="flex justify-center items-center grow">{product.quantity}</Typography>
						<Button onClick={onRemoveHandler}>
							<MinusIcon className="w-5 h-5" />
						</Button>
					</div>
				) : (
					<Button onClick={onClickHandler}>Add To Cart</Button>
				)}
			</CardFooter>
		</Card>
	);
};
