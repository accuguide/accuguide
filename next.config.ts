import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  trailingSlash: false,
  experimental: {
    optimizeCss: true,
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX(nextConfig)
