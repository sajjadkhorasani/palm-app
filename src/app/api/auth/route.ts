import { NextRequest, NextResponse } from 'next/server';

import { db, verifyJWT } from '@@lib';

export async function POST(req: NextRequest) {
	try {
		const { jwtToken } = await req.json();

		const { id } = await verifyJWT(jwtToken);

		const user = await db.user.findUnique({
			where: {
				id: id as string,
			},
		});

		if (!user) {
			return NextResponse.json({ isOk: false });
		}

		return NextResponse.json({ isOk: true, user });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ isOk: false });
	}
}
