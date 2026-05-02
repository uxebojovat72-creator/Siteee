/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'export' for Cloudflare Pages (static), undefined for Ubuntu/Docker (server mode)
  output: process.env.BUILD_FOR_CF === '1' ? 'export' : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
