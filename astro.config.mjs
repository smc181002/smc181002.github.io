// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
import svelte from '@astrojs/svelte'; // @ts-check

import { defineConfig } from "astro/config";

// https://astro.build/config

// https://astro.build/config
export default defineConfig( /** @type {import('astro').AstroUserConfig} */
{
  server: {
    host: true
  },
  site: "https://smc181002.github.io/",
  // Enable the Svelte renderer to support Svelte components.
  integrations: [svelte()]
});