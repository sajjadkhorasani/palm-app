import { NextRequest, NextResponse } from 'next/server';

import { db, getUser, hashPassword } from '@@lib';

export async function PUT(req: NextRequest) {
	const { email, password, repeatPassword, ...data } = await req.json();
	const user = await getUser();

	try {
		await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				...data,
				password: await hashPassword(password),
			},
		});

		return NextResponse.json({ isOk: true, message: 'User Updated Successfully!' });
	} catch (err) {
		return NextResponse.json({ message: new Error(err as any).message }, { status: 401 });
	}
}
