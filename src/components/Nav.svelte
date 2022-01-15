<script>
  $: scrollY=0;
  $: innerHeight=0;

  export let active = '/';

  const actionsList = [
    {name: 'Home', path: '/'},
    {name: 'Projects', path: '/projects'},
    {name: 'Blogs', path: '/blogs'},
  ]

      /* <div class="{(scrollY<=innerHeight-40) ? `text-white font-500` : `text-gray-800`} font-['Poppins'] flex items-center"> */
</script>

<svelte:window bind:scrollY bind:innerHeight/>

<nav class="py-8 z-40 w-full backdrop-blur flex-none bg-white/80 supports-backdrop-blur:bg-white/50 border border-gray-900/10">

  <div class="flex mx-auto px-24 w-full items-center text-center">
    <div class="flex-1"> <img src="/assets/logo.svg" alt="logo" class="w-48"> </div>
    <div>
      <div class="text-gray-800 font-['Poppins'] flex items-center">
        {#each actionsList as action (action.path)}
          <a class="{(active == action.path) ? `underline decoration-2 decoration-indigo-500 underline-offset-2` : ``} hover:underline hover:decoration-4 transition-all hover:decoration-indigo-500 hover:underline-offset-2 mx-2 px-2 text-lg" href={action.path}>{action.name}</a>
        {/each}
        <a class="mx-2 px-2 text-lg flex items-center" href="https://github.com/smc181002"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" width="24px" alt="GitHub"></a>
      </div>
  </div>
</nav>
