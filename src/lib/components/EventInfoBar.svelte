<script>
  import curtains_img from "$lib/images/curtains.svg";
  import duration_img from "$lib/images/duration.svg";
  import ruble_img from "$lib/images/ruble.svg";

  export let hall_name, duration, price;
</script>

<div class="infobar">
  <div class="gap-4">
    <img class="w-6 h-6" src="{curtains_img}" alt="Curtains">
    <p><b>Зал:</b> {hall_name}</p>
  </div>
  <div>
    <img class="w-6 h-6" src="{duration_img}" alt="Duration">
    <p><b>Длительность:</b> {duration}</p>
  </div>
  <div>
    <img class="w-6 h-6" src="{ruble_img}" alt="Curtains">
    <p><b>Цена:</b> {price}</p>
  </div>
</div>

<style lang="scss">
  .infobar {
    @apply grid w-full justify-between px-20 py-6;
    grid-template-columns: 3fr 4fr 3fr;
    grid-auto-flow: column;

    & > * {
      @apply flex gap-3 items-center justify-center;
    }
  }
</style>