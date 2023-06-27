/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['picsum.photos']
	},
	experimental: {
		serverComponentsExternalPackages: ['bcrypt'],
	},
};

module.exports = nextConfig;
