<script lang="ts">
    import type {CollectionEntry} from 'astro:content'
    export let item:CollectionEntry<'works'>;
</script>

<a href={`/work/${item.slug}`} class="relative flex flex-col justify-center transition-all duration-200">
    <div class="z-[1] flex items-center gap-5 peer">
        <div>
            <h1 class="hover:underline text-4xl font-semibold mb-2">{item.data.title}</h1>
            <p>{item.data.description}</p>
        </div>
    </div>
    <!-- <div class="z-[100] right-0 absolute peer-hover:bg-black rounded-2xl transition-all bg-[url('https://images.unsplash.com/photo-1701109693556-4a9e58618ab9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center w-40 h-60 peer-hover:block hidden">
    </div> -->
</a>