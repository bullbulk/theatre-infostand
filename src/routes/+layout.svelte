<script>
  import "$lib/css/styles.scss";
  import Footer from "./Footer.svelte";
  import { get } from "svelte/store";
  import { dataFetcher } from "$lib/store.js";
  import { loadData } from "$lib/utils.js";

  if (get(dataFetcher) === null) {
    dataFetcher.set(
      setInterval(() => loadData(fetch), 5 * 60 * 1000));
  }
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
