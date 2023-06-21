import { db } from '@@lib';

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
