/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true, // Enable SVGO to optimize SVGs
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false, // Keep viewBox for better scaling
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
