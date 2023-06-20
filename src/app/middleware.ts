import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { db, verifyJWT } from '@@lib';

export async function middleware(req: NextRequest) {
	const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

	if (!jwt) {
		req.nextUrl.pathname = '/signin';
		return NextResponse.redirect(req.nextUrl);
	}

	try {
		const data = verifyJWT(jwt.value);
		const user = await db.user.findUnique({ where: { ...JSON.parse(data as string) } });
		Object.assign(req, user);
		return NextResponse.next();
	} catch (err) {
		console.error(err);
		req.nextUrl.pathname = '/signin';
		return NextResponse.redirect(req.nextUrl);
	}
}

export const config = {
	matcher: ['/((?!api/signup|api/signin|_next/static|_next/image|favicon.ico).*)'],
};
