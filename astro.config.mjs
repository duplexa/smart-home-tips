// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import affiliateLinks from './src/lib/rehype-affiliate-links.mjs';
import removeMarkdownH1 from './src/lib/rehype-remove-markdown-h1.mjs';

export default defineConfig({
  site: 'https://smarthomestips.com',
  output: 'static',
  trailingSlash: 'never',
  adapter: cloudflare(),
  integrations: [sitemap({ lastmod: new Date() })],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    rehypePlugins: [removeMarkdownH1, affiliateLinks],
  },
});
