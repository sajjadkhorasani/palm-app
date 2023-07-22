import { NextResponse } from 'next/server';

import { db, hashPassword } from '@@lib';

export async function POST(request: Request) {
	const { email, password, ...data } = await request.json();

	try {
		const user = await db.user.create({
			data: { isAdmin: email.includes('admin'), password: await hashPassword(password), email, ...data },
		});

		return NextResponse.json({
			user: {
				id: user.id,
				email: user.email,
				name: `${user.firstName}-${user.lastName}`,
			},
		});
	} catch (err) {
		return NextResponse.json(
			{ message: new Error(err as any).message },
			{
				status: 500,
			},
		);
	}
}
