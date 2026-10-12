import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
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
for (const path of ['logo.png', 'qr-code.png', 'qr-code-heart.png',
  'officers/mir-sami-khan.jpg', 'officers/gobinathan-vaseegaran.jpg', 'officers/leah-harris.jpg',
  'officers/asma-mohammed.jpg', 'officers/samaira-srivastva.jpg', 'officers/ayesha-sharif.jpg']) {
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
for (const file of posts.filter(file => file.endsWith('.md'))) await access(new URL(`blog/${file.slice(0, -3)}/index.html`, dist));
console.log(`Verified route entry points, 404 shell, 9 local images, ${fontCount} font references, and blog deep links.`);
