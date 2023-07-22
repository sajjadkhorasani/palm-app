import fs from 'fs';
import { db, getUser } from '@@lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const user = await getUser();

	try {
		const data = (await req.formData()).get('file') as Blob;
		const filename = `${user?.id}.png`;
		const buffer = Buffer.from(await data.arrayBuffer());
		fs.writeFileSync(`./public/upload/${filename}`, buffer);
		await db.user.update({ where: { id: user?.id }, data: { avatar: `/upload/${filename}` } });
		return NextResponse.json({ message: 'SUCCESS' });
	} catch (err) {
		return NextResponse.json(
			{ message: new Error(err as any).message },
			{
				status: 401,
			},
		);
	}
}
