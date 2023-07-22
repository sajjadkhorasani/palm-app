'use client';

import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader } from '@material-tailwind/react';

import API from '@@services';
import { useForm } from '@@hooks';
import { ChooseFile, NumberBox, TextField } from '@@components';

import { IProductForm, ProductFormDefaultValue, ProductFormSchema } from './index.schema';
import Image from 'next/image';

interface IProductEditableCardProps {
	isNew?: boolean;
	product?: Prisma.ProductGetPayload<true>;
}

export function ProductEditableCard({ isNew, product }: IProductEditableCardProps) {
	const router = useRouter();
	const { control, handleSubmit } = useForm<IProductForm>(
		ProductFormSchema as any,
		ProductFormDefaultValue(product) as any,
	);

	const onSubmitHandler = async (data: IProductForm) => {
		try {
			const res = isNew ? await API.addNewProduct(data) : await API.editProduct(data);

			if (res.data.isOk) {
				router.push('/');
			}
		} catch (err) {}
	};

	const onInValid = (err: any) => {
		console.log('ERR', err);
	};

	return (
		<Card className="w-full max-w-[24rem]">
			{!isNew ? (
				<CardHeader
					floated={false}
					shadow={false}
					className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
				>
					<Image
						priority
						width={350}
						height={360}
						className="cursor-pointer"
						alt={`${product?.name} Image`}
						src={`/upload/${product?.id}.png` || ''}
					/>
				</CardHeader>
			) : null}
			<CardBody>
				<form
					className="relative flex flex-col justify-start items-center mt-12 gap-6"
					onSubmit={handleSubmit(onSubmitHandler, onInValid)}
				>
					{isNew ? <ChooseFile name="image" control={control} /> : null}
					<TextField name="name" control={control} placeholder="Name" />
					<TextField name="description" control={control} placeholder="Description" />
					<NumberBox name="price" control={control} placeholder="Price" />
					<Button type="submit" variant="outlined" color="gray">
						{!isNew ? 'Edit Product' : 'Add Product'}
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}
