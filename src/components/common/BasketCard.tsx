'use client';

import Image from 'next/image';
import { Product } from '@prisma/client';
import { useCallback } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

interface BasketCardProps {
	basketItem: Product & { quantity: number };
	onAddToCart?: (product: Product) => void;
	onRemoveFromCard?: (product: Product) => void;
}

export const BasketCard = ({ basketItem, onAddToCart, onRemoveFromCard }: BasketCardProps) => {
	const onClickHandler = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			onAddToCart!(basketItem);
		},
		[basketItem, onAddToCart],
	);

	const onRemoveHandler = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			onRemoveFromCard!(basketItem);
		},
		[basketItem, onRemoveFromCard],
	);

	return (
		<Card className="flex flex-row flex-nowrap w-full justify-start items-stretch self-stretch gap-2">
			<div
				className="w-[35rem] flex self-stretch grow m-0"
			>
				<Image
					fill
					alt="product image"
					src={basketItem?.image || '/default.png'}
					className="!relative object-cover object-center rounded-md"
				/>
			</div>
			<CardBody className="flex flex-col justify-start items-stretch grow gap-4">
				<div className="flex justify-between items-center">
					<Typography variant="h4" color="blue-gray">
						{basketItem.name}
					</Typography>
					<Typography variant="h6" color="blue" className="uppercase">
						${basketItem.price.toFixed(2)}
					</Typography>
				</div>
				<Typography color="gray" className="flex justify-start items-start font-normal grow">
					{basketItem.description}
				</Typography>
				{onAddToCart && onRemoveFromCard ? (
					<div className="flex flex-row self-end justify-center items-center">
						<Button onClick={onClickHandler}>
							<PlusIcon className="w-5 h-5" />
						</Button>
						<Typography className="flex justify-center items-center grow px-10">
							{basketItem.quantity}
						</Typography>
						<Button onClick={onRemoveHandler}>
							<MinusIcon className="w-5 h-5" />
						</Button>
					</div>
				) : null}
			</CardBody>
		</Card>
	);
};
