// Generated from `site` in astro.config.mjs so the sitemap URL always matches the live domain.
export function GET({ site }) {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
