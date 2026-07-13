import createNextIntlPlugin from 'next-intl/plugin'
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

async function setup() {
  if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform()
  }
}

setup()

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts')

const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      }
    ],
  },
  webpack: (config, { webpack, nextRuntime }) => {
    if (nextRuntime === 'edge') {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^async_hooks$/,
          'node:async_hooks'
        )
      )
    }
    return config
  },
};

export default withNextIntl(nextConfig)
