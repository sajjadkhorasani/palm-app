import { NextRequest, NextResponse } from 'next/server';

import { db } from '@@lib';

export async function DELETE(req: NextRequest, context: { params: { productId: string } }) {
	try {
		await db.product.update({
			where: {
				id: context.params.productId,
			},
			data: {
				deleted: true,
			},
		});

		return NextResponse.json({ isOk: true, message: 'Product Delete Successfully!' });
	} catch (err) {
		return NextResponse.json({ message: new Error(err as any).message }, { status: 401 });
	}
}
