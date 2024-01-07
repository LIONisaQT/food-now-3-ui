/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['s3-media3.fl.yelpcdn.com'],
	},
	experimental: { esmExternals: true }
}

module.exports = nextConfig
