import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from "next/server";

import { db, getUser } from "@@lib";

export async function POST(req: NextRequest) {
	const form = await req.formData();
	const author = await getUser();

	if (!form.get('name') && !form.get('description') && !form.get('price')) {
		return NextResponse.json({ message: 'Please fill all the fields' }, { status: 401 });
	}

	try {
		const newProduct = await db.product.create({
			data: {
				name: form.get('name') as any,
				description: form.get('description') as any,
				price: Number(form.get('price')) as any,
				author: {
					connect: {
						id: author?.id,
					},
				},
			},
			include: {
				author: true,
			},
		});

		if (form.get('image')) {
			const image = form.get('image') as Blob;
			const filename = `${newProduct?.id}.png`;
			const buffer = Buffer.from(await image.arrayBuffer());
			fs.writeFileSync(path.join(process.cwd(), 'public', 'upload', filename), buffer);
		}

		return NextResponse.json({ isOk: true, message: 'Product Created Successfully!', data: newProduct });
	} catch (err) {
		return NextResponse.json({ message: new Error(err as any).message }, { status: 401 });
	}
}

export async function PUT(req: NextRequest) {
	const data = await req.json();

	try {
		await db.product.update({
			where: {
				id: data.id,
			},
			data,
		});

		return NextResponse.json({ isOk: true, message: 'Product Updated Successfully!' });
	} catch (err) {
		return NextResponse.json({ message: new Error(err as any).message }, { status: 401 });
	}
}