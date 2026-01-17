import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ✅ NEW: Performance optimizations
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // ✅ NEW: Compression
  compress: true,

  // ✅ NEW: PWA caching
  headers: async () => [
    {
      source: '/manifest.json',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:path*.(png|jpg|jpeg|svg|webp|avif)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

export default nextConfig;
