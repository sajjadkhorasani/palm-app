import clsx from 'clsx';
import { cookies } from 'next/headers';

import { ProductCard } from '@@components';
import { db, getUserFromCookie } from '@@lib';
import { Prisma } from '@prisma/client';

const getData = async () => {
	const user = await getUserFromCookie(cookies());

	return new Promise<Prisma.ProductGetPayload<true>[]>((resolve) => {
		setTimeout(async () => {
			return resolve((await db.product.findMany({ where: { authorId: user?.id } })) as any);
		}, 5000);
	});
};

export default async function HomePage() {
	const data = await getData();

	return (
		<div
			className={clsx('relative flex flex-row flex-wrap backdrop-blur-lg grow gap-8 px-8 py-10', {
				'justify-around items-start': data.length,
				'justify-center items-center': !data.length,
			})}
		>
			{data.length ? (
				data.map((product, index) => <ProductCard key={index} product={product} />)
			) : (
				<h1 className="text-4xl text-black">Not Found Any Product</h1>
			)}
		</div>
	);
}
