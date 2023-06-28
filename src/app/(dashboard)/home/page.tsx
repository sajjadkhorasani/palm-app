import clsx from 'clsx';
import { Prisma } from '@prisma/client';
import { cookies } from 'next/headers';

import { ProductCard } from '@@components';
import { db, getUserFromCookie } from '@@lib';

const getData = async () => {
	const user = await getUserFromCookie(cookies());

	const where: Prisma.ProductWhereInput = user?.isAdmin ? { authorId: user?.id } : {};

	return new Promise<{ products: Prisma.ProductGetPayload<true>[]; user: Prisma.UserGetPayload<true> }>((resolve) => {
		setTimeout(async () => {
			return resolve({ user: user as any, products: await db.product.findMany({ where }) });
		}, 5000);
	});
};

export default async function HomePage() {
	const data = await getData();

	return (
		<div
			className={clsx(
				'relative container mx-auto flex flex-row flex-wrap backdrop-blur-lg grow gap-8 px-8 py-10',
				{
					'justify-start items-start': data.products.length,
					'justify-center items-center': !data.products.length,
				},
			)}
		>
			{data.products.length ? (
				<>
					{data.products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
					{data.user.isAdmin ? <ProductCard isNew /> : null}
				</>
			) : (
				<h1 className="text-4xl text-black">Not Found Any Product</h1>
			)}
		</div>
	);
}