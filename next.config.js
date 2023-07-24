/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['picsum.photos', 'uploadthing.com'],
	},
	async rewrites() {
		return [
			{
				source: '/',
				destination: '/home',
			},
		];
	},
	async redirects() {
		return [
			// {
			// 	source: '/signin',
			// 	destination: '/',
			// 	permanent: true,
			// 	has: [
			// 		{
			// 			type: 'cookie',
			// 			key: process.env.COOKIE_NAME,
			// 		},
			// 	],
			// },
			// {
			// 	source: '/signup',
			// 	destination: '/',
			// 	permanent: true,
			// 	has: [
			// 		{
			// 			type: 'cookie',
			// 			key: process.env.COOKIE_NAME,
			// 		},
			// 	],
			// },
		];
	},
	experimental: {
		serverActions: true,
		serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
	},
};

module.exports = nextConfig;
