/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.mapbox.com', 'supabase.co'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader',
        });
        return config;
    },
};

module.exports = nextConfig;
