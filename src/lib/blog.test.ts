import { expect, it } from 'vitest';
import { blogAssetUrl, getAllPosts, getPostBySlug, type BlogPost } from './blog';

const post = (slug: string, date: string, draft = false): BlogPost => ({slug, date, draft, title: slug, author: '', excerpt: '', content: ''});
it('sorts published posts newest first and prevents direct draft lookups', () => {
  const posts = [post('old', '2026-01-01'), post('private', '2026-12-01', true), post('new', '2026-10-01')];
  expect(getAllPosts(posts).map(p => p.slug)).toEqual(['new', 'old']);
  expect(getPostBySlug(posts, 'private')).toBeUndefined();
});
it('handles uploaded image paths at the Pages base and custom domain root without double-prefixing', () => {
  expect(blogAssetUrl('/blog-images/photo.png', '/heart-bridge/')).toBe('/heart-bridge/blog-images/photo.png');
  expect(blogAssetUrl('/heart-bridge/blog-images/photo.png', '/heart-bridge/')).toBe('/heart-bridge/blog-images/photo.png');
  expect(blogAssetUrl('/blog-images/photo.png', '/')).toBe('/blog-images/photo.png');
  expect(blogAssetUrl('https://example.com/photo.jpg', '/heart-bridge/')).toBe('https://example.com/photo.jpg');
  expect(blogAssetUrl('//example.com/photo.jpg', '/heart-bridge/')).toBe('//example.com/photo.jpg');
});
