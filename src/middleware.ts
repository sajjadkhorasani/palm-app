import nextAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export function middleware() {
	if (process.env.NODE_ENV !== 'development') {
		return nextAuth;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api/auth|api/signup|signin|signup|_next/static|_next/image|favicon.ico).*)'],
};
