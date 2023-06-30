import formidable from 'formidable';
import { PageConfig } from 'next';
// import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

// import { upload } from '@@lib';
import path from 'path';

// const router = createEdgeRouter<NextRequest, { params?: unknown }>();

// router.use(async (req, res, next) => {

// });

// router.post((req) => {
// 	return NextResponse.json({ message: 'File Saved Successfully!' });
// });

export async function POST(req: NextRequest) {
	try {
		const form = formidable({
			keepExtensions: true,
			uploadDir: path.join(process.cwd(), 'public', 'uploads'),
		});
		form.parse(req as any, (err, fields, files) => {
			console.log(err, fields, files);
			// return NextResponse.json({ message: 'File Saved Successfully!' });
		});
	} catch (err) {
		return NextResponse.json(
			{ message: new Error(err as any).message },
			{
				status: 401,
			},
		);
	}
}

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
};
