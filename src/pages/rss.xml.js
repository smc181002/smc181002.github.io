import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const works = await getCollection("works");
  return rss({
    title: "N Sri Meher Chaitanya · Works",
    description: "Projects, tools and write-ups by N Sri Meher Chaitanya",
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
