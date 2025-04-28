// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'hi'], // Available languages
    defaultLocale: 'en', // Default language
    localeDetection: false, // Disable auto language detection if you want to control it manually
  },
};

module.exports = nextConfig;
