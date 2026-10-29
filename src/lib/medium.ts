// Fetches the latest posts from the Medium RSS feed at build time.
// The site is static, so posts refresh whenever the site is rebuilt.

export const MEDIUM_PROFILE = "https://medium.com/@smc181002";
const FEED_URL = "https://medium.com/feed/@smc181002";

export interface MediumPost {
  title: string;
  link: string;
  date: Date;
  excerpt: string;
  readMinutes: number;
  tags: string[];
}

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

const tags = (xml: string, name: string) =>
  [...xml.matchAll(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "g"))].map((m) => decode(m[1]));

function excerptOf(html: string, max = 160) {
  // Skip headings and figure captions so the excerpt starts at the body text.
  const paragraph = html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? html;
  const text = decode(paragraph.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
  return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, "")}…` : text;
}

export async function getMediumPosts(limit = 3): Promise<MediumPost[]> {
  try {
    const res = await fetch(FEED_URL, { headers: { "User-Agent": "smc181002.github.io build" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();

    return tags(xml, "item")
      .slice(0, limit)
      .map((item) => {
        const content = tag(item, "content:encoded");
        const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
        return {
          title: tag(item, "title"),
          link: tag(item, "link").split("?")[0],
          date: new Date(tag(item, "pubDate")),
          excerpt: excerptOf(content),
          readMinutes: Math.max(1, Math.round(words / 230)),
          tags: tags(item, "category").slice(0, 2),
        };
      });
  } catch (err) {
    // A failed fetch shouldn't break the build; the section falls back to a profile link.
    console.warn(`[medium] couldn't load ${FEED_URL}: ${err}`);
    return [];
  }
}
