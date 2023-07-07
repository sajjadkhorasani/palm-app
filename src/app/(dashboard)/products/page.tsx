import clsx from 'clsx';
import { headers } from 'next/headers';

import { ProductCard } from '@@components';
import { db, getUserFromHeaders } from '@@lib';

const getData = async () => {
	const user = getUserFromHeaders(headers());
	const products = await db.product.findMany({ where: { authorId: user.id, deleted: false } });

	return { user, products };
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
					{data.products?.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
					{data.user?.isAdmin ? <ProductCard isNew /> : null}
				</>
			) : (
				<h1 className="text-4xl text-black">Not Found Any Product</h1>
			)}
		</div>
	);
}
