/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/auth',    destination: '/', permanent: false },
      { source: '/home',    destination: '/', permanent: false },
      { source: '/healing', destination: '/', permanent: false },
      { source: '/healing/:slug*', destination: '/', permanent: false },
      { source: '/write',   destination: '/', permanent: false },
      { source: '/letters', destination: '/', permanent: false },
      { source: '/journey', destination: '/', permanent: false },
      { source: '/feed',    destination: '/', permanent: false },
      { source: '/profile', destination: '/', permanent: false },
      { source: '/search',  destination: '/', permanent: false },
    ]
  },
  async rewrites() {
    return [
      { source: '/b7e4c3d2f1a0b9c8d7e6f5a4b3c2d1e0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4', destination: '/home' },
      { source: '/a8f3b2c1e4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1', destination: '/auth' },
      { source: '/d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4', destination: '/healing' },
      { source: '/d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4/:slug*', destination: '/healing/:slug*' },
      { source: '/c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9', destination: '/write' },
      { source: '/f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2', destination: '/letters' },
      { source: '/e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3', destination: '/journey' },
      { source: '/c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5', destination: '/feed' },
      { source: '/a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1', destination: '/profile' },
      { source: '/b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0', destination: '/search' },
    ]
  },
}

module.exports = nextConfig
