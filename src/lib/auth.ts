import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
	bcrypt.compare(plainTextPassword, hashedPassword);

export const generateJWT = (user: Prisma.UserGetPayload<true>) => {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24 * 7;

	return jwt.sign(
		{
			id: user.id,
			email: user.email,
		},
		process.env.JWT_SECRET as string,
		{
			algorithm: 'HS256',
			notBefore: iat,
			expiresIn: exp,
		},
	);
};

export const verifyJWT = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET as string);
};
