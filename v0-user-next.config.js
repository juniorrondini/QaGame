/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["example.com"], // Add any image domains you'll be using
  },
  async rewrites() {
    return [
      {
        source: "/api/jamendo/:path*",
        destination: "https://api.jamendo.com/v3.0/:path*",
      },
    ]
  },
}

module.exports = nextConfig

