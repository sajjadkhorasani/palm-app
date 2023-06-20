import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { jwtVerify } from 'jose';

const verifyJWT = async (token: string) => {
	const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

	return payload.payload as any;
};

export async function middleware(req: NextRequest) {
	const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

	if (!jwt) {
		return NextResponse.redirect(new URL('/signin', req.url));
	}

	try {
		await verifyJWT(jwt.value);
		if (req.nextUrl.pathname === '/') {
			return NextResponse.redirect(new URL('/home', req.url));
		}
		return NextResponse.next();
	} catch (err) {
		console.error(err);
		// req.cookies.delete(process.env.COOKIE_NAME as string);
		return NextResponse.redirect(new URL('/signin', req.url));
	}
}

export const config = {
	matcher: ['/((?!api/signup|api/signin|signin|signup|_next/static|_next/image|favicon.ico).*)'],
};
