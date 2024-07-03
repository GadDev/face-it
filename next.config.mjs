/** @type {import('next').NextConfig} */

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/harvard-museums-collections' : ''

const nextConfig = {
  // output: 'export', // <=== enables static exports, required for github pages deployment
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'harvardartmuseums.org',
      },
      {
        protocol: 'https',
        hostname: 'nrs.hvrd.art',
      },
      {
        protocol: 'https',
        hostname: 'ids.lib.harvard.edu',
      },
    ],
  },
}

export default nextConfig
