import { randomUUID } from 'crypto';
import { getRandomNumber } from '@@utils';
import { db, hashPassword } from '@@lib';

async function main() {
	db.$use(async (params, next) => {
		if (params.model === 'Product') {
			if (params.action === 'delete') {
				params.action = 'update';
				params.args['data'] = { deleted: true };
			}

			if (params.action === 'deleteMany') {
				params.action = 'updateMany';
				if (params.args.data != undefined) {
					params.args.data['deleted'] = true;
				} else {
					params.args['data'] = { deleted: true };
				}
			}
		}
		return next(params);
	});

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
				create: new Array(5).fill(1).map((_, index) => ({
					name: `Product ${index + 1}`,
					image: `https://picsum.photos/id/${index + 100}/300.webp`,
					price: getRandomNumber(100, 700),
				})),
			},
		},
		include: {
			products: true,
		},
	});

	console.log({ user });
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
