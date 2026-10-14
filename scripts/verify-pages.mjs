import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
// Use Astro's YAML dependency to read the same frontmatter format as the collection.
const { load } = createRequire(import.meta.resolve('astro/package.json'))('js-yaml');
const base = '/heart-bridge/';
const dist = new URL('../dist/', import.meta.url);
const router = await readFile(new URL('../src/components/Router.tsx', import.meta.url), 'utf8');
const routes = [...router.matchAll(/path: "([^"]+)"/g)].map(m => m[1])
  .filter(path => !['/', '*'].includes(path) && !path.includes(':'));
for (const route of ['', ...routes]) await access(new URL(`${route ? route + '/' : ''}index.html`, dist));
const index = await readFile(new URL('index.html', dist), 'utf8');
assert.equal(await readFile(new URL('404.html', dist), 'utf8'), index);
assert(index.includes(`${base}logo.png`));
const assets = new URL('_astro/', dist);
const files = await readdir(assets);
const code = (await Promise.all(files.filter(file => file.endsWith('.js'))
  .map(file => readFile(new URL(file, assets), 'utf8')))).join('\n');
for (const path of ['logo.png',
  'officers/mir-sami-khan-headshot.png', 'officers/gobinathan-vaseegaran-headshot.png', 'officers/leah-harris-headshot.png',
  'officers/asma-mohammed-headshot.png', 'officers/samaira-srivastva-headshot.png', 'officers/ayesha-sharif-headshot.png']) {
  assert(code.includes(base) && code.includes(`/${path}`), `Missing base-aware asset: ${path}`);
  await access(new URL(path, dist));
}
let fontCount = 0;
for (const file of files.filter(file => file.endsWith('.css'))) {
  const css = await readFile(new URL(file, assets), 'utf8');
  assert(!css.includes('/public/fonts/'));
  for (const match of css.matchAll(/url\(([^)]+\.woff2)\)/g)) {
    const url = match[1].replace(/['"]/g, '');
    assert(url.startsWith(base), `Font missing base path: ${url}`);
    await access(new URL(url.slice(base.length), dist));
    fontCount++;
  }
}
assert(fontCount > 0);
const posts = await readdir(new URL('../src/content/blog/', import.meta.url));
for (const file of posts.filter(file => file.endsWith('.md'))) {
  const source = await readFile(new URL(`../src/content/blog/${file}`, import.meta.url), 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert(frontmatter, `Missing blog frontmatter: ${file}`);
  const data = load(frontmatter[1]);
  const page = new URL(`blog/${file.slice(0, -3)}/index.html`, dist);
  if (data.draft === true) {
    await assert.rejects(access(page), { code: 'ENOENT' }, `Draft page was emitted: ${file}`);
  } else {
    await access(page);
  }
}
console.log(`Verified route entry points, 404 shell, 7 local images, ${fontCount} font references, and blog deep links.`);
