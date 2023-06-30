import fs from 'fs';
import formidable from 'formidable';
import { NextResponse } from 'next/server';
import { IncomingMessage } from 'http';

export const upload = (req: IncomingMessage, res: NextResponse, next: (init?: any) => NextResponse) => {
	const form = formidable();

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}

		console.log('FILE', files);
	});
};

// const saveFile = async (file: File) => {
// 	const data = fs.readFileSync(file.path);
// 	fs.writeFileSync(`./public/${file.name}`, data);
// 	await fs.unlinkSync(file.path);
// 	return;
// };
