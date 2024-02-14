import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, Session, getServerSession } from 'next-auth';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
	bcrypt.compare(plainTextPassword, hashedPassword);

const adapter = PrismaAdapter(db);
export const authOptions: NextAuthOptions = {
	adapter,
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/signin',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'jsmith@mail.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials || !credentials.email || !credentials.password) {
					return null;
				}

				try {
					const user = await db.user.findUnique({
						where: {
							email: credentials.email,
						},
					});

					if (!user) {
						return null;
					}

					if (await comparePasswords(credentials.password, user.password)) {
						return {
							id: user.id,
							email: user.email,
							name: `${user.firstName}-${user.lastName}`,
							image: user.avatar,
							isAdmin: user.isAdmin,
						} as any;
					}
				} catch (err) {
					console.log('🚀', err);
					return null;
				}
			},
		}),
	],
	callbacks: {
		session: ({ session, token, user }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
		jwt: ({ token, user, session }) => {
			if (user) {
				const currentUser = user as unknown as any;
				return {
					...token,
					id: currentUser.id,
				};
			}

			return token;
		},
	},
};

export const getUser = async () => {
	const session = await getServerSession(authOptions);

	return session!.user as Session['user'] & { id: string };
};
