#!/usr/bin/env node

/**
 * Post-build validation script for sitemap.xml
 * 
 * This script validates that:
 * 1. sitemap.xml exists in the output directory
 * 2. All URLs in the sitemap have corresponding HTML files
 * 3. Minimum expected counts are met (to catch regressions)
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');
const SITEMAP_PATH = path.join(OUT_DIR, 'sitemap.xml');

// Minimum expected counts to catch accidental exclusions
const MIN_COUNTS = {
  blog: 90,      // At least 90 blog posts
  stats: 8,      // All 8 stats pages
  static: 6,     // Home, about, work, blog, apps, atlas
};

function extractUrls(sitemapContent) {
  const urlRegex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

function urlToFilePath(url) {
  const urlObj = new URL(url);
  let pathname = urlObj.pathname;
  
  // Remove leading slash
  if (pathname.startsWith('/')) {
    pathname = pathname.slice(1);
  }
  
  // Handle root path
  if (pathname === '' || pathname === '/') {
    return 'index.html';
  }
  
  // Add .html extension if not present
  if (!pathname.endsWith('.html')) {
    pathname = pathname + '.html';
  }
  
  return pathname;
}

function categorizeUrl(url) {
  if (url.includes('/blog/')) {
    return 'blog';
  }
  if (url.includes('/stats/')) {
    return 'stats';
  }
  return 'static';
}

function validate() {
  console.log('Validating sitemap...\n');
  
  // Check sitemap exists
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('ERROR: sitemap.xml not found at', SITEMAP_PATH);
    process.exit(1);
  }
  
  const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const urls = extractUrls(sitemapContent);
  
  console.log(`Found ${urls.length} URLs in sitemap\n`);
  
  // Categorize and count URLs
  const counts = { blog: 0, stats: 0, static: 0 };
  const missingFiles = [];
  
  for (const url of urls) {
    const category = categorizeUrl(url);
    counts[category]++;
    
    const filePath = path.join(OUT_DIR, urlToFilePath(url));
    
    if (!fs.existsSync(filePath)) {
      missingFiles.push({ url, expectedFile: filePath });
    }
  }
  
  // Report counts
  console.log('URL counts by category:');
  console.log(`  - Blog posts: ${counts.blog} (minimum: ${MIN_COUNTS.blog})`);
  console.log(`  - Stats pages: ${counts.stats} (minimum: ${MIN_COUNTS.stats})`);
  console.log(`  - Static pages: ${counts.static} (minimum: ${MIN_COUNTS.static})`);
  console.log('');
  
  // Check minimum counts
  let hasErrors = false;
  
  for (const [category, minCount] of Object.entries(MIN_COUNTS)) {
    if (counts[category] < minCount) {
      console.error(`ERROR: ${category} count (${counts[category]}) is below minimum (${minCount})`);
      hasErrors = true;
    }
  }
  
  // Check for missing files
  if (missingFiles.length > 0) {
    console.error('\nERROR: The following sitemap URLs are missing their HTML files:\n');
    for (const { url, expectedFile } of missingFiles) {
      console.error(`  URL: ${url}`);
      console.error(`  Expected: ${expectedFile}\n`);
    }
    hasErrors = true;
  }
  
  if (hasErrors) {
    console.error('\nSitemap validation FAILED');
    process.exit(1);
  }
  
  console.log('Sitemap validation PASSED');
}

validate();

