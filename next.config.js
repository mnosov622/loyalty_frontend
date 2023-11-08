/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Exclude bcrypt from client-side bundle
			config.externals = ['bcrypt', ...config.externals];
		}

		return config;
	},
};

module.exports = nextConfig;
