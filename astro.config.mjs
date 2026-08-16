// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import affiliateLinks from './src/lib/rehype-affiliate-links.mjs';

export default defineConfig({
  site: 'https://smarthomestips.com',
  output: 'static',
  trailingSlash: 'never',
  adapter: cloudflare(),
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    rehypePlugins: [affiliateLinks],
  },
});
