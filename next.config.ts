/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add these experimental settings
  experimental: {
    taint: false,
    serverActions: true,
  }
};

module.exports = nextConfig;