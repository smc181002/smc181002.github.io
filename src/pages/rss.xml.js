import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get(context) {
    return rss({
        title: `Meher Chaitanya's Project`,
        description: `Meher Chaitanya's project blogging page`,
        site: context.site,
        items: await pagesGlobToRssItems(
            import.meta.glob('./project/*.{md,mdx}'),
        ),
    });
}

