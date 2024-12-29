const nextConfig = {
  experimental: {
    // Must be an object — empty is fine if you don't need custom settings
    serverActions: {},
  },

  // Moved out of `experimental` and renamed from `serverComponentsExternalPackages`
  serverExternalPackages: ['mongoose'],

  images: {
    domains: ['m.media-amazon.com'],
  },
};

export default nextConfig;