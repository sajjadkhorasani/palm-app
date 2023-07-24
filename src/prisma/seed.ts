import { randomUUID } from 'crypto';
import { getRandomNumber } from '@@utils';

import { db, hashPassword } from '@@lib';

async function main() {
	console.log('🌱 Seeding the database...');

	const currentId = randomUUID();
	const user = await db.user.upsert({
		where: { email: 'admin@mail.com' },
		update: {},
		create: {
			id: currentId,
			firstName: 'Admin',
			lastName: 'Admin LastName',
			email: 'admin@mail.com',
			password: await hashPassword('12345678'),
			isAdmin: true,
			products: {
				create: new Array(6).fill(1).map((_, index) => ({
					name: `Product ${index + 1}`,
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
					image: `https://picsum.photos/id/${index + 15}/400.webp`,
					price: getRandomNumber(100, 700),
				})),
			},
		},
		include: {
			products: true,
		},
	});

	console.log('👤 User: ', user);
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
