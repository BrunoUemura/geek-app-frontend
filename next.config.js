/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_API: process.env.BACKEND_API,
  },
};

module.exports = nextConfig;
