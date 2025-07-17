/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    taint: false,
    serverActions: {},  // ✅ Fixed here
  },
};

module.exports = nextConfig;
