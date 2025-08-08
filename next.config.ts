import type { NextConfig } from "next";

// @ts-ignore
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@chakra-ui/react",
      "react-icons",
      "recharts"
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
