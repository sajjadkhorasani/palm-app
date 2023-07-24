export { default } from 'next-auth';

export const config = {
	matcher: ['/((?!api/auth|api/signup|signin|signup|_next/static|_next/image|favicon.ico).*)'],
};
