import { headers } from 'next/headers';

import { PurchasedList } from '@@components';
import { db, getUserFromHeaders } from '@@lib';

const getData = async () => {
	const user = getUserFromHeaders(headers());

	return db.basket.findMany({ where: { userId: user.id }, select: { purchasedList: true } });
};

export default async function PurchasedPage() {
	const data = await getData();
	
	console.log("🚀 ~ PurchasedPage ~ data:", data)

	return (
		<div
			className={
				'relative container mx-auto flex flex-col justify-start items-stratch backdrop-blur-lg grow gap-8 px-8 py-10'
			}
		>
			{/* <PurchasedList cart={data?.map((cart) => cart.purchasedList) || undefined} /> */}
		</div>
	);
}
