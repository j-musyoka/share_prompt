/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      '@': './',
      '@models': './model',
      '@utils': './utils',
      '@components': './components',
      '@styles': './styles',
    },
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

module.exports = nextConfig