import clsx from 'clsx';

import { ProductCard } from '@@components';
import { db, getUser } from '@@lib';
import { isAdmin } from '@@utils/isAdmin';

const getData = async () => {
	const user = await getUser();
	const products = await db.product.findMany({ where: { authorId: user.id, deleted: false } });

	return { user, products };
};

export default async function ProductsPage() {
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
			<>
				{data.products?.map((product, index) => (
					<ProductCard key={index} product={product} />
				))}
				{isAdmin(data.user) ? <ProductCard isNew /> : null}
			</>
		</div>
	);
}
