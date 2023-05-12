// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
import svelte from '@astrojs/svelte'; // @ts-check
import sitemap from '@astrojs/sitemap'; // @ts-check

import { defineConfig } from "astro/config";

// https://astro.build/config

// https://astro.build/config
export default defineConfig( /** @type {import('astro').AstroUserConfig} */
{
  server: {
    host: true
  },
  site: "https://smc181002.me",
  // site: "https://scis.uohyd.ac.in/~19mcme12/",
  // base: "~19mcme12",
  // Enable the Svelte renderer to support Svelte components.
  integrations: [svelte(), sitemap()],
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'solarized-light',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
});
