<script>
  const techno = new Date('Jun 30, 2022')

  const soLongNerds = () => {
    let today = new Date()
    return (today.getDate() == techno.getDate() && today.getMonth() == techno.getMonth()) 
  }

</script>

{#if soLongNerds()}
  <div class="flex justify-center items-center font-[VT323] z-[10000] w-full flex-none bg-[#ae1200] dark:bg-red-400 dark:text-zinc-900 text-white text-center">
      <div class="mr-4">
        <img src="https://preview.redd.it/jq328tfjdt061.png?width=200&format=png&auto=webp&s=006a76de91f3b0b2f3e60f4a419eeaf5fd9625b9" alt="techno" width="20px">
      </div>
      <div> So long nerds </div>
  </div>
{/if}
