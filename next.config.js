/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		serverComponentsExternalPackages: ['mongoose'],
	},
	images: {
		domains: ['m.media-amazon.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'down-id.img.susercontent.com',
			},
		],
	},
};

module.exports = nextConfig;
