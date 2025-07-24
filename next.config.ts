/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    taint: false,
    serverActions: {},  
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
