// import csrf from 'edge-csrf';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// const csrfProtect = csrf({
// 	cookie: {
// 		name: process.env.COOKIE_NAME,
// 		httpOnly: true,
// 		path: '/',
// 		maxAge: 60 * 60 * 24 * 7,
// 	},
// 	secretByteLength: 20,
// });

export async function middleware(req: NextRequest) {
	// const res = NextResponse.next();

	// // const csrfError = await csrfProtect(req, res);

	// // console.log('🚀 MIDD:', csrfError?.message);
	// // if (csrfError) {
	// // 	const url = req.nextUrl.clone();
	// // 	url.pathname = '/api/csrf-invalid';
	// // 	return NextResponse.rewrite(url);
	// // }

	const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

	if (!jwt) {
		return NextResponse.redirect(new URL('/signin', req.url));
	}

	try {
		console.log('URL', process.env.NEXT_PUBLIC_VERCEL_URL);
		const payload = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth`, {
			method: 'POST',
			body: JSON.stringify({ jwtToken: jwt.value }),
		});
		const data = await payload.json();

		if (!data.user) {
			// req.cookies.delete(process.env.COOKIE_NAME as string);
			return NextResponse.redirect(new URL('/signin', req.url));
		}

		const headers = new Headers(req.headers);
		headers.set('user', JSON.stringify(data.user));

		return NextResponse.next({ request: { headers } });
	} catch (err) {
		console.error(err);
		req.cookies.delete(process.env.COOKIE_NAME as string);
		return NextResponse.redirect(new URL('/signin', req.url));
	}
}

export const config = {
	matcher: ['/((?!api/auth|api/signup|api/signin|signin|signup|_next/static|_next/image|favicon.ico).*)'],
};
