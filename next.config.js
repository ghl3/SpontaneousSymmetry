const path = require('path');

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
  
  // Webpack configuration to ignore the pages directory conflict
  // (Next.js App Router conflicts with Flask's pages/ directory)
  webpack: (config, { isServer }) => {
    // Ignore the pages/ directory which is for Flask content, not Next.js pages
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/pages/**', '**/apps/**', '**/assets/MathJax/**'],
    };
    return config;
  },
};

module.exports = nextConfig;

