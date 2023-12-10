<!-- Hero.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let scrollPosition = 0;
</script>

<style>
.mask-gradient {
  mask: linear-gradient(90deg, transparent, white 10%, white 80%, transparent);
}

</style>

<svelte:window bind:scrollY={scrollPosition}></svelte:window>

<section class="h-[90vh] z-[-10] bg-[#17191C] text-[#f1f7ff] relative justify-center flex gap-x-30 w-full min-h-[60vh] tbl:min-h-[95vh] items-center ">
    <div class="z-[-1]">
        <img src="/assets/logo-gearlike.png" width="960rem" alt="9petal" class="flex-[3] block overflow-x-hidden" style="transform: translateY({scrollPosition/2.5}px);" />
    </div>
    <div class="z-[-2] fixed flex flex-row gap-10 w-full overflow-hidden whitespace-nowrap">
        <div class="bg-gradient-to-b from-40% bg-clip-text from-white to-70% to-custom-text/50 text-transparent h-[20rem] items-center flex flex-row gap-10 lg:text-6xl sm:text-5xl text-4xl font-extrabold" style="transform: translate({-scrollPosition+50}px, 0);">
        Developer. Engineer.
        Developer. Engineer.
        Developer. Engineer.
        Developer. Engineer.
        Developer. Engineer.
        Developer. Engineer.
        </div>
    </div>
    <!-- {#if scrollPosition<=10} -->
    <!-- {/if} -->
</section>
<div class="absolute flex w-full justify-center">
    <a href="#works" class="z-[1000] bottom-0 flex items-center" style="opacity: {1/(scrollPosition/2.5+1)};"> 
        <span class="material-symbols-rounded animate-bounce">arrow_downward</span>
        <span> scroll down</span>
    </a>
</div>
<div class="h-[10rem] bg-gradient-to-t from-[#17191C] text-[#f1f7ff] "></div>