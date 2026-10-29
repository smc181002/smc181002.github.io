<script lang="ts">
    import type {CollectionEntry} from 'astro:content'
    export let item:CollectionEntry<'works'>;

    const date = item.data.date.toLocaleDateString('en-GB', {month: 'short', year: 'numeric'});
</script>

<a href={`/work/${item.slug}`} class="group flex flex-wrap items-center gap-x-6 gap-y-3 p-5 text-ek-text border-b-hair border-ek-border last:border-b-0 hover:bg-ek-hover transition-colors">
    <span class="w-24 text-xs text-ek-text-2 ek-num">{date}</span>
    <span class="flex-[999_1_360px] min-w-0 flex flex-col gap-0.5">
        <span class="text-lg font-medium tracking-[-0.01em] group-hover:underline underline-offset-4 decoration-hair">{item.data.title}</span>
        <span class="text-sm text-ek-text-2">{item.data.description}</span>
    </span>
    <span class="flex flex-wrap gap-1.5">
        {#each item.data.tags.slice(0, 2) as tag}
            <span class="ek-chip">{tag}</span>
        {/each}
    </span>
    <span class="material-symbols-rounded text-ek-text-3 text-lg" aria-hidden="true">chevron_right</span>
</a>
