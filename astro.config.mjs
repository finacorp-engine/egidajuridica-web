// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({

  site: "https://egidajuridica.com",
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({ mode: "standalone" }),

  server: {
    port: 4333,
  },

  integrations: [react(), sitemap()],
});