import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { db, getUserFromCookie, hashPassword } from '@@lib';

export async function PUT(request: Request) {
	const { password, ...data } = await request.json();

	const user = await getUserFromCookie(cookies());

	try {
		await db.user.update({
			where: {
				id: user?.email,
				email: user?.email,
			},
			data: {
				password: await hashPassword(password),
				...data,
			},
		});
	} catch (err) {
		return NextResponse.json(
			{ message: new Error(err as any).message },
			{
				status: 401,
			},
		);
	}
}
