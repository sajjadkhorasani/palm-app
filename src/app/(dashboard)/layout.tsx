import { Prisma } from '@prisma/client';
import { headers } from 'next/headers';

import { MainHeader } from '@@components';
import { SessionProvider } from '@@contexts';
import { getUserFromHeaders } from '@@lib';

const getData = async () => {
	const user = getUserFromHeaders(headers());

	return user;
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const user = await getData();
	return (
		<div className="mx-auto w-screen flex flex-col justify-stretch items-stretch grow bg-gray-200">
			<SessionProvider value={user as Prisma.UserGetPayload<true>}>
				<MainHeader />
				{children}
			</SessionProvider>
		</div>
	);
}
