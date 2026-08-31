// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domínio oficial de produção (mesmo do site antigo em WordPress)
const SITE = 'https://psicamilafrassetto.com.br';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always', // CSS crítico inline -> zero request bloqueante
    assets: '_assets',
  },
  integrations: [
    sitemap({
      // Single-page: só a home é indexável de fato
      lastmod: new Date(),
      changefreq: 'monthly',
      priority: 1.0,
    }),
  ],
});
