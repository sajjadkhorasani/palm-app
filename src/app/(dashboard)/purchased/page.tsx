import { PurchasedList } from '@@components';
import { db, getUser } from '@@lib';
import clsx from 'clsx';

const getData = async () => {
	const user = await getUser();

	return db.basket.findMany({ where: { userId: user.id }, select: { purchasedList: true } });
};

export default async function PurchasedPage() {
	const data = await getData();

	return (
		<div
			className={clsx(
				'relative container mx-auto flex flex-row flex-wrap backdrop-blur-lg grow gap-8 px-8 py-10',
				{
					'justify-start items-start': data.length,
					'justify-center items-center': !data.length,
				},
			)}
		>
			<PurchasedList cart={data?.map((cart) => cart.purchasedList) as any} />
		</div>
	);
}
