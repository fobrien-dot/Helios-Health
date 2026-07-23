// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fobrien-dot.github.io',
  base: '/Helios-Health/',
  // English-only for now, but declaring the locale list up front means adding a
  // second language later is a routing config change, not a restructure.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  integrations: [sitemap()],
});
