<script>
  $: scrollY=0;
  $: innerHeight=0;

  export let active = '/';

  const actionsList = [
    {name: 'Home', path: '/'},
    {name: 'Projects', path: '/projects'},
    {name: 'Blogs', path: '/blogs'},
  ]

  const techno = new Date('June 30, 2022')

  const soLongNerds = () => {
    let today = new Date()
    return (today.getDate() == techno.getDate() && today.getMonth() == techno.getMonth()) 
  }

</script>

{#if soLongNerds()}
  <div class="flex justify-center font-[VT323] z-[10000] w-full flex-none bg-[#ae1200] text-white text-center">
    <div class="flex-1">
      So long nerds
    </div>
    <div class="mr-4 flex items-center"><img src="https://preview.redd.it/jq328tfjdt061.png?width=200&format=png&auto=webp&s=006a76de91f3b0b2f3e60f4a419eeaf5fd9625b9" alt="techno" width="20px"></div>
  </div>
{/if}
