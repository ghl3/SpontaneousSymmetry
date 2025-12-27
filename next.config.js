/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output as static site for Vercel deployment
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for compatibility with existing URLs
  trailingSlash: false,
  
  // Webpack configuration to ignore the pages/ directory
  // (contains markdown content, not Next.js pages)
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/pages/**'],
    };
    return config;
  },
};

module.exports = nextConfig;

