import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Neon serverless is fully compatible with Edge Runtime
  serverExternalPackages: [],

  // Allow external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agenciaf2f.com',
        pathname: '/wp-content/**',
      },
    ],
  },
};

export default nextConfig;
