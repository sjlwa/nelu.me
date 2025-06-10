// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import db from '@astrojs/db';

import node from '@astrojs/node';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  inlineStylesheets: 'never',
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [db(), preact()],

  adapter: node({
    mode: 'standalone',
  }),
});