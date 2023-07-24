import { NextRequest, NextResponse } from 'next/server';

import { db, getUser } from '@@lib';

export async function POST(req: NextRequest) {
	const data = await req.json();
	const author = await getUser();

	console.log("🚀 ~ POST ~ author:", author)
	
	try {
		const newProduct = await db.product.create({
			data: {
				name: data.name,
				description: data.description,
				price: Number(data.price),
				image: data.image,
				author: {
					connect: {
						id: author.id,
					}
				},
			},
			include: {
				author: true,
			},
		});

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
