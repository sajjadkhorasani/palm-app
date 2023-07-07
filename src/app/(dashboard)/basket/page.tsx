import { BasketList } from '@@components';

export default async function BasketPage() {
	return (
		<div
			className={
				'relative container mx-auto flex flex-col justify-start items-stratch backdrop-blur-lg grow gap-8 px-8 py-10'
			}
		>
			<BasketList />
		</div>
	);
}
