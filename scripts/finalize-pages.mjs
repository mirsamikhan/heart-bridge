import { readFile, writeFile } from 'node:fs/promises';

// GitHub serves this shell for unknown deep links; React Router reads the original
// pathname directly, preserving the query string and hash without a redirect.
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
await writeFile(new URL('../dist/404.html', import.meta.url), html);
await writeFile(new URL('../dist/.nojekyll', import.meta.url), '');
