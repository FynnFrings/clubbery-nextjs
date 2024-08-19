/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
			},
		],
	},
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: "/__/auth/:path*",
					destination: `https://clubbery-dev.firebaseapp.com/__/auth/:path*`,
				},
			],
		};
	},
};

export default nextConfig;
