import { Product } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { db, getUser } from '@@lib';

export async function POST(req: NextRequest) {
	const { list } = await req.json();
	const user = await getUser();

	try {
		const newPurchase = await db.basket.create({
			data: {
				userId: user.id,
				purchasedList: {
					create: list.map((item: Product & { quantity: number }) => ({
						productId: item.id,
						quantity: item.quantity,
					})),
				},
			},
			include: {
				user: true,
				purchasedList: true,
			},
		});

		return NextResponse.json({ isOk: true, message: 'Your Purchase Checkout Successfully!', data: newPurchase });
	} catch (err) {
		return NextResponse.json({ message: new Error(err as any).message }, { status: 401 });
	}
}
