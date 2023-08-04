'use client';

import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';

import API from '@@services';
import { useUploadThing } from '@@utils';
import { useAxios, useForm } from '@@hooks';
import { Button, ChooseFile, NumberBox, TextField } from '@@components';

import { IProductForm, ProductFormDefaultValue, ProductFormSchema } from './index.schema';

interface IProductEditableCardProps {
	isNew?: boolean;
	product?: Prisma.ProductGetPayload<true>;
}

export function ProductEditableCard({ isNew, product }: IProductEditableCardProps) {
	const router = useRouter();
	const { fetch, loading } = useAxios(isNew ? API.addNewProduct : API.editProduct);
	const { startUpload } = useUploadThing('imageUploader');
	const { control, handleSubmit } = useForm<IProductForm>(
		ProductFormSchema as any,
		ProductFormDefaultValue(product) as any,
	);

	const onSubmitHandler = async (data: any) => {
		try {
			if (isNew && data.image) {
				const image = await startUpload([data.image as any]);
				data.image = (image as any)[0].fileUrl;
			}

			const res = await fetch(data);

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
						src={product?.image || ''}
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
					<Button loading={loading} type="submit" variant="outlined" color="gray">
						{!isNew ? 'Edit Product' : 'Add Product'}
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}
