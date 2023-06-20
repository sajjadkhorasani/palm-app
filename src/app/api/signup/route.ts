import { NextResponse } from 'next/server';

import { db, generateJWT, hashPassword } from '@@lib';

export async function POST(request: Request) {
	const { email, password, ...data } = await request.json();

	try {
		const user = await db.user.create({
			data: { isAdmin: email.includes('admin'), password: await hashPassword(password), email, ...data },
		});

		const token = generateJWT(user);
		const res = new NextResponse();
		res.cookies.set(process.env.COOKIE_NAME as string, token, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});
		return res;
	} catch (err) {
		return NextResponse.json(
			{ message: new Error(err as any).message },
			{
				status: 401,
			},
		);
	}
}
