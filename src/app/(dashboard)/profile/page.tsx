import { headers } from 'next/headers';

import { ProfileCard } from '@@components';
import { getUserFromHeaders } from '@@lib';

const getData = async () => {
	const user = getUserFromHeaders(headers());

	return user;
};

export default async function ProfilePage() {
	const user = await getData();
	return (
		<div className="container mx-auto flex flex-col justify-start items-center grow py-40 gap-4">
			<ProfileCard user={user as any} />
		</div>
	);
}
