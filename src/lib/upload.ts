import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export const upload = async (req: NextRequest, res: NextResponse, next: (init?: any) => NextResponse) => {
	try {
		const file = (await req.formData()).get('file') as any;
		fs.writeFileSync(`./public/${file?.filename}`, file?.toBuffer());
		return next();
	} catch (err) {
		return next(
			NextResponse.json(
				{ message: new Error(err as any).message },
				{
					status: 401,
				},
			),
		);
	}
};
