<script>
  import "$lib/css/styles.scss";
  import Footer from "./Footer.svelte";
  import { get } from "svelte/store";
  import { dataFetcher, eventsData } from "$lib/store.js";
  import { loadData } from "$lib/utils.js";
  import { preloadImage } from "./preload.js";
  import { onMount } from "svelte";

  if (get(dataFetcher) === null) {
    dataFetcher.set(
      setInterval(() => loadData(fetch), 5 * 60 * 1000));
  }

  onMount(() => {
    eventsData.subscribe((value) => {
      for (let i of value.events) {
        preloadImage(i.image);
      }
    });
  });

</script>

<div class="app">
  <main>
    <slot />
  </main>

  <Footer />
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    main {
        flex: 1;
        @apply relative flex flex-col w-full m-0 box-border;
    }
</style>
