import { NextResponse } from 'next/server';

import { comparePasswords, db, generateJWT } from '@@lib';

export async function POST(request: Request) {
	const { email, password } = await request.json();

	const user = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return NextResponse.json(
			{ message: 'Invalid Login' },
			{
				status: 401,
			},
		);
	}

	const isUser = await comparePasswords(password, user.password);

	if (!isUser) {
		return NextResponse.json(
			{ message: 'Invalid Login' },
			{
				status: 401,
			},
		);
	}

	const token = await generateJWT(user);
	const res = new NextResponse();
	res.cookies.set(process.env.COOKIE_NAME as string, token, {
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	});
	return res;
}
