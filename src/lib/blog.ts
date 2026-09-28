export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image?: string;
  content: string;
}

export function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: trimmed };
  }

  const endMarkerIndex = trimmed.indexOf('\n---', 3);
  if (endMarkerIndex === -1) {
    return { data: {}, content: trimmed };
  }

  const yamlBlock = trimmed.slice(3, endMarkerIndex).trim();
  const content = trimmed.slice(endMarkerIndex + 4).trim();
  const data: Record<string, string> = {};

  yamlBlock.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  });

  return { data, content };
}

export function getAllPosts(): BlogPost[] {
  const modules = import.meta.glob('/src/content/blog/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }) as Record<string, string>;

  const posts: BlogPost[] = [];

  for (const [filepath, rawContent] of Object.entries(modules)) {
    const filename = filepath.split('/').pop()?.replace(/\.md$/, '') || '';
    const { data, content } = parseFrontmatter(rawContent);

    posts.push({
      slug: filename,
      title: data.title || filename.replace(/-/g, ' '),
      date: data.date || '',
      author: data.author || 'DilSe Health Team',
      excerpt: data.excerpt || '',
      image: data.image || undefined,
      content,
    });
  }

  // Sort newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}
