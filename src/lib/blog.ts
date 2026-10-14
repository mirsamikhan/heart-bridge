import { createContext, useContext } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image?: string;
  draft: boolean;
  content: string;
}

// Astro supplies validated, published entries; no raw Markdown is bundled here.
export const BlogPostsContext = createContext<BlogPost[]>([]);
export const useBlogPosts = () => useContext(BlogPostsContext);

export function getAllPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(post => !post.draft).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(posts: BlogPost[], slug: string): BlogPost | undefined {
  return getAllPosts(posts).find(post => post.slug === slug);
}

// CMS paths stay independent of the deployment location.
export function blogAssetUrl(url: string, base = import.meta.env.BASE_URL): string {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const prefix = base.replace(/\/$/, '');
  if (!prefix || url === prefix || url.startsWith(`${prefix}/`)) return url;
  return `${prefix}${url}`;
}
