import { getCollection } from 'astro:content';
import { getAllPosts, type BlogPost } from './blog';

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const entries = await getCollection('blog', entry => !entry.data.draft);
  return getAllPosts(entries.map(entry => ({
    slug: entry.id,
    ...entry.data,
    content: entry.body || '',
  })));
}
