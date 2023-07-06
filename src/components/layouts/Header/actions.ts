'use server';

import { cookies } from 'next/headers';

export const signout = () => {
	const cookie = cookies();
	cookie.delete(process.env.COOKIE_NAME as string);
};
