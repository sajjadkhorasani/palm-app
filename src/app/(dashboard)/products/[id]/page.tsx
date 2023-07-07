import { db } from '@@lib';
import { ProductEditableCard } from '@@components';

const getData = async (id: string) => {
	const product = await db.product.findUnique({ where: { id } });

	return product;
};

export default async function ProductPage({ params }: { params: { id: string } }) {
	const product = await getData(params.id);
	return (
		<div className="container mx-auto flex flex-col justify-start items-center grow py-40 gap-4">
			<ProductEditableCard product={product as any} />
		</div>
	);
}
