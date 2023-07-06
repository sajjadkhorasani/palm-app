import { ProductEditableCard } from '@@components';

export default async function ProductPage() {
	return (
		<div className="container mx-auto flex flex-col justify-start items-center grow py-40 gap-4">
			<ProductEditableCard isNew />
		</div>
	);
}
