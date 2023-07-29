'use client';

import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Typography,
} from '@material-tailwind/react';

import { deleteProduct } from '@@services/api';

interface IProductCardProps {
	product?: Prisma.ProductGetPayload<true>;
	isNew?: boolean;
}

export const ProductCard = ({ product, isNew }: IProductCardProps) => {
	const router = useRouter();
	const [modal, setModal] = useState(false);

	const onAddHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push('/products/add-new');
	};

	const onEditHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push(`/products/${product?.id}`);
	};

	const onDeleteHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		await deleteProduct(product!.id);
		setModal(false);
		router.refresh();
	};

	return (
		<Card className="w-96">
			<Dialog open={Boolean(modal)} handler={() => {}}>
				<DialogHeader>Confirm Delete Product</DialogHeader>
				<DialogBody className="flex flex-col justify-center items-center" divider>
					Are You Sure to Delete Product {product?.name} ?
				</DialogBody>
				<DialogFooter>
					<Button className="mr-1" variant="text" color="red" onClick={() => setModal(false)}>
						<span>Cancel</span>
					</Button>
					<Button variant={'gradient'} color={'red'} onClick={onDeleteHandler}>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>

			{!isNew ? (
				<>
					<CardHeader shadow={false} floated={false} className="h-96">
						<Image
							className="w-full h-full object-cover"
							width={150}
							height={180}
							alt={product?.name || ''}
							src={product?.image || '/default.png'}
						/>
					</CardHeader>
					<CardBody>
						<div className="flex items-center justify-between mb-2">
							<Typography color="blue-gray" className="font-medium">
								{product?.name}
							</Typography>
							<Typography color="blue-gray" className="font-medium">
								${product?.price.toFixed(2)}
							</Typography>
						</div>
						<Typography variant="small" color="gray" className="font-normal opacity-75">
							{product?.description}
						</Typography>
					</CardBody>
				</>
			) : (
				<CardBody>
					<PlusCircleIcon className="mx-auto w-24 h-24" />
				</CardBody>
			)}
			<CardFooter className="flex flex-col justify-start items-stretch gap-4 pt-0">
				<Button
					ripple={false}
					fullWidth={true}
					className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
					onClick={!isNew ? onEditHandler : onAddHandler}
				>
					{!isNew ? 'Edit' : 'Add New Product'}
				</Button>
				{!isNew ? (
					<Button
						ripple={false}
						fullWidth
						className="bg-red-400 text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
						onClick={() => setModal(true)}
					>
						Delete
					</Button>
				) : null}
			</CardFooter>
		</Card>
	);
};
