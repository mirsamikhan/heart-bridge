import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { pagesPaths, pagesAttributes } from './scripts/pages-paths.mjs';

export default defineConfig({
  site: 'https://mirsamikhan.github.io',
  base: '/heart-bridge/',
  output: 'static',
  integrations: [tailwind(), react({ babel: { plugins: [pagesAttributes('/heart-bridge/')] } })],
  vite: {
    plugins: [pagesPaths()],
    define: {
      'import.meta.env.BASE_NAME': JSON.stringify('/heart-bridge'),
      'import.meta.env.PUBLIC_GITHUB_PAGES': 'true',
    },
  },
  devToolbar: { enabled: false },
});
