import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: Date;
  author: string;
  categories: string[];
  id: number | null;
  url: string;
  fileName: string;
}

export interface Post extends PostMeta {
  content: string;
  contentHtml: string;
}

/**
 * Parse the filename to extract date and slug
 * Format: YYYY-MM-DD-slug-name.markdown
 */
function parseFileName(fileName: string): { dateStr: string; slug: string } | null {
  const match = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.markdown$/);
  if (!match) return null;
  return {
    dateStr: match[1],
    slug: match[2],
  };
}

/**
 * Parse date from frontmatter - handles multiple formats
 */
function parseDate(dateValue: any): Date {
  if (dateValue instanceof Date) {
    return dateValue;
  }
  if (typeof dateValue === 'string') {
    // Handle format: "2009-05-07 23:04:00+00:00" or "2016-11-13 10:32:11.361362"
    return new Date(dateValue);
  }
  return new Date();
}

/**
 * Get all post metadata (without rendering content)
 */
export function getAllPostsMeta(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts: PostMeta[] = [];
  
  for (const fileName of fileNames) {
    const parsed = parseFileName(fileName);
    if (!parsed) continue;
    
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    // Check if post is enabled (defaults to true if not specified)
    const enable = data.enable === undefined || 
                   data.enable === true || 
                   (typeof data.enable === 'string' && data.enable.toUpperCase() === 'TRUE');
    
    if (!enable) continue;
    
    const date = parseDate(data.date);
    const slug = data.slug || parsed.slug;
    
    posts.push({
      slug,
      title: data.title || slug,
      date,
      author: data.author || '',
      categories: Array.isArray(data.categories) ? data.categories : [],
      id: data.id || data.wordpress_id || null,
      url: `${parsed.dateStr}-${slug}`,
      fileName,
    });
  }
  
  // Sort by date, newest first
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(): string[] {
  return getAllPostsMeta().map(post => post.url);
}

/**
 * Get post metadata by URL slug (includes the date prefix)
 */
export function getPostMetaByUrl(url: string): PostMeta | undefined {
  return getAllPostsMeta().find(post => post.url === url);
}

/**
 * Get post by ID (for WordPress redirect compatibility)
 */
export function getPostByLegacyId(id: number): PostMeta | undefined {
  return getAllPostsMeta().find(post => post.id === id);
}

/**
 * Render markdown content to HTML
 */
async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMath)  // Must run before remarkGfm to protect math from underscore parsing
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  
  return result.toString();
}

/**
 * Get full post with rendered content
 */
export async function getPostByUrl(url: string): Promise<Post | null> {
  const meta = getPostMetaByUrl(url);
  if (!meta) return null;
  
  const fullPath = path.join(postsDirectory, meta.fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const contentHtml = await renderMarkdown(content);
  
  return {
    ...meta,
    content,
    contentHtml,
  };
}

/**
 * Get latest N posts
 */
export function getLatestPosts(n: number = 1): PostMeta[] {
  return getAllPostsMeta().slice(0, n);
}

/**
 * Get archive grouped by month
 */
export interface ArchiveMonth {
  year: number;
  month: number;
  posts: PostMeta[];
}

export function getArchive(): ArchiveMonth[] {
  const posts = getAllPostsMeta();
  const archiveMap = new Map<string, ArchiveMonth>();
  
  for (const post of posts) {
    const year = post.date.getFullYear();
    const month = post.date.getMonth() + 1; // 1-indexed
    const key = `${year}-${month}`;
    
    if (!archiveMap.has(key)) {
      archiveMap.set(key, { year, month, posts: [] });
    }
    archiveMap.get(key)!.posts.push(post);
  }
  
  // Sort by date, newest first
  return Array.from(archiveMap.values())
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
}

/**
 * Get archive for a specific month
 */
export function getArchiveByMonth(year: number, month: number): PostMeta[] {
  const posts = getAllPostsMeta();
  return posts.filter(post => {
    return post.date.getFullYear() === year && 
           post.date.getMonth() + 1 === month;
  });
}

/**
 * Format month name
 */
export function formatMonthYear(year: number, month: number): string {
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

