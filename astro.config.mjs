// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import db from '@astrojs/db';

import node from '@astrojs/node';

import preact from '@astrojs/preact';

import auth from 'auth-astro';

import cloudflare from '@astrojs/cloudflare';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  inlineStylesheets: 'never',
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [db(), preact(), auth()],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  env: {
    schema: {
      GOOGLE_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: false }),
      GOOGLE_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: false }),
      ADMIN_WHITELIST: envField.string({ context: "server", access: "secret", optional: false }),
    }
  }
});
