import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

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
  integrations: [tailwind(), mdx(), sitemap(), svelte()],
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-light',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true
    }
  }
});