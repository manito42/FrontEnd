/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "cdn.intra.42.fr", "i.pravatar.cc"],
  },
};

module.exports = nextConfig;
