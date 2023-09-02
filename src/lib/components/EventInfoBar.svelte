<script>
  import curtains_img from "$lib/images/curtains.svg";
  import duration_img from "$lib/images/duration.svg";
  import ruble_img from "$lib/images/ruble.svg";

  export let hall_name, duration, price;
</script>

<div class="infobar">
  <div class="gap-4">
    <img alt="Curtains" class="w-6 h-6" src="{curtains_img}">
    <p><b>Зал:</b> {hall_name}</p>
  </div>
  <div>
    <img alt="Duration" class="w-6 h-6" src="{duration_img}">
    <p><b>Длительность:</b> {duration}</p>
  </div>
  <div>
    <img alt="Curtains" class="w-6 h-6" src="{ruble_img}">
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