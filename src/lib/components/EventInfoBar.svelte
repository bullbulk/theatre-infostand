<script>
  import curtains_img from "$lib/images/curtains.svg";
  import duration_img from "$lib/images/duration.svg";
  import ruble_img from "$lib/images/ruble.svg";

  export let hall_name, duration, price;
</script>

<div class="flex w-full justify-between px-24 py-6">
  <div class="flex gap-4 items-center justify-center">
    <img class="w-6 h-6" src="{curtains_img}" alt="Curtains">
    <p><b>Зал:</b> {hall_name}</p>
  </div>
  <div class="flex gap-3 items-center justify-center">
    <img class="w-6 h-6" src="{duration_img}" alt="Duration">
    <p><b>Длительность:</b> {duration}</p>
  </div>
  <div class="flex gap-3 items-center justify-center">
    <img class="w-6 h-6" src="{ruble_img}" alt="Curtains">
    <p><b>Цена:</b> {price} руб.</p>
  </div>
</div>