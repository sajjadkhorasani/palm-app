import { cookies } from 'next/headers';

import { db, getUserFromCookie } from '@@lib';

const getData = async () => {
	return await getUserFromCookie(cookies());
};

export default async function ProfilePage() {
	const user = await getData();
	console.log('🚀', user);
	return <div className="container flex flex-col justify-start items-stretch grow">{JSON.stringify(user)}</div>;
}
