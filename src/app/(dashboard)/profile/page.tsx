import { db, getUser } from '@@lib';
import { ProfileCard } from '@@components';

const getData = async () => {
	const session = await getUser();

	const user = await db.user.findUnique({ where: { id: session.id } });

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
