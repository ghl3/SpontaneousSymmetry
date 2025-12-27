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

const pagesDirectory = path.join(process.cwd(), 'pages');

export interface PageMeta {
  slug: string;
  title: string;
  author?: string;
  date?: Date;
}

export interface Page extends PageMeta {
  content: string;
  contentHtml: string;
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
 * Get a page by its path relative to pages directory
 */
export async function getPage(pagePath: string): Promise<Page | null> {
  const fullPath = path.join(pagesDirectory, `${pagePath}.markdown`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const contentHtml = await renderMarkdown(content);
  
  return {
    slug: pagePath,
    title: data.title || pagePath,
    author: data.author,
    date: data.date ? new Date(data.date) : undefined,
    content,
    contentHtml,
  };
}

/**
 * Get all stats pages
 */
export function getStatsSlugs(): string[] {
  const statsDir = path.join(pagesDirectory, 'stats');
  
  if (!fs.existsSync(statsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(statsDir);
  return files
    .filter(file => file.endsWith('.markdown'))
    .map(file => file.replace('.markdown', ''));
}

/**
 * Get a stats page
 */
export async function getStatsPage(slug: string): Promise<Page | null> {
  return getPage(`stats/${slug}`);
}

/**
 * Stats page navigation order
 */
export const STATS_PAGES = [
  { slug: 'introduction', title: 'Introduction' },
  { slug: 'probability', title: 'Probability' },
  { slug: 'distributions', title: 'Distributions' },
  { slug: 'estimators', title: 'Estimators' },
  { slug: 'frequentist-hypothesis-testing', title: 'Hypothesis Testing' },
  { slug: 'confidence-intervals', title: 'Confidence Intervals' },
  { slug: 'statistical-tests', title: 'Statistical Tests' },
  { slug: 'regression', title: 'Regression' },
];

