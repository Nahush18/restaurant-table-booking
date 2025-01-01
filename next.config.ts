/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
      appDir: true, // If you're using the App Router
  },
  env: {
      // Optional: If you want to use environment variables directly in your code
      MONGODB_URI: process.env.MONGODB_URI,
  },
};

module.exports = nextConfig;
