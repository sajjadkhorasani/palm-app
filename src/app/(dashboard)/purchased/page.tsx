import { PurchasedList } from '@@components';
import { db, getUser } from '@@lib';

const getData = async () => {
	const user = await getUser();

	return db.basket.findMany({ where: { userId: user.id }, select: { purchasedList: true } });
};

export default async function PurchasedPage() {
	const data = await getData();

	return (
		<div
			className={
				'relative container mx-auto flex flex-col justify-start items-stratch backdrop-blur-lg grow gap-8 px-8 py-10'
			}
		>
			<PurchasedList cart={data?.map((cart) => cart.purchasedList)} />
		</div>
	);
}
