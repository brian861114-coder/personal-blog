// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// GitHub Pages：
// - 使用者頁（username.github.io）→ base: '/'
// - 專案頁（username.github.io/repo）→ base: '/repo/'
const site = process.env.SITE ?? 'https://example.github.io';
const base = process.env.BASE ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [mdx()],
});
