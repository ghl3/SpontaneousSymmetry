import type { MetadataRoute } from 'next';
import { getAllPostsMeta } from '@/lib/posts';
import { STATS_PAGES } from '@/lib/pages';

const BASE_URL = 'https://spontaneoussymmetry.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/atlas`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.url}`,
    lastModified: post.date,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  // Stats pages
  const statsPages: MetadataRoute.Sitemap = STATS_PAGES.map((page) => ({
    url: `${BASE_URL}/stats/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts, ...statsPages];
}

