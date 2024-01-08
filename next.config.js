/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['s3-media3.fl.yelpcdn.com'],
	},
	experimental: { esmExternals: true },
	env: {
		GMAP_API_KEY: process.env.GMAP_API_KEY,
	}
}

module.exports = nextConfig
