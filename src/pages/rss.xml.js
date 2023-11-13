import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const works = await getCollection("works");
  return rss({
    title: "smc181002 - N Sri Meher Chaitanya | Works",
    description: "My works in the field of CS&IT",
    site: context.site,
    items: works.map((work) => ({
      title: work.data.title,
      pubDate: work.data.date,
      description: work.data.description,
      link: `/work/${work.slug}/`,
    })),
    customData: `<language>en-in</language>`,
  });
}
