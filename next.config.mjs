/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000', // Optional: only needed if you access localhost:3000
            pathname: '/api/home-media-images/file/**',
          },
        ],
      },
};

export default nextConfig;
