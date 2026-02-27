import type { NextConfig } from "next";

/**
 * Next.js Configuration with Optimizations
 * - Image optimization
 * - Security headers
 * - Package import optimization for Turbopack
 */
const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Turbopack configuration (Next.js 16+)
  turbopack: {
    // Optimize Monaco Editor imports
    resolveAlias: {
      '@monaco-editor/react': '@monaco-editor/react',
    },
  },

  // Webpack configuration for better code splitting (fallback)
  webpack: (config, { isServer }) => {
    // Better code splitting for lesson modules
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate lesson modules into chunks
            lessons: {
              name: 'lessons',
              test: /[\\/]lib[\\/]lessons[\\/]/,
              priority: 10,
            },
            // Monaco Editor in separate chunk
            monaco: {
              name: 'monaco',
              test: /[\\/]monaco-editor[\\/]/,
              priority: 20,
            },
          },
        },
      };
    }
    return config;
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:all*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // Redirects for better UX
  async redirects() {
    return [
      {
        source: '/course',
        destination: '/course/mes-01',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
