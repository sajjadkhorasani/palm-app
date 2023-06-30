import { NextRequest, NextResponse } from 'next/server';

import { db, getUserFromHeaders } from '@@lib';

export async function POST(req: NextRequest) {
	const {} = await req.json();
	const user = getUserFromHeaders(req.headers);

	try {
		// const newProduct = db.product.create({
		//     data: {
		//     }
		// })
	} catch (err) {
		return NextResponse.json({ message: new Error(err as any).message }, { status: 401 });
	}
}
