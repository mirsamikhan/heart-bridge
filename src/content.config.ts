import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.union([z.string().min(1), z.date()]).pipe(z.coerce.date()).transform(date => date.toISOString().slice(0, 10)),
    author: z.string().default('DilSe Health Team'),
    excerpt: z.string().default(''),
    image: z.string().nullable().optional().transform(image => image || undefined),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
