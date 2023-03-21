<script>
  import Header from "./Header.svelte";
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
  <Header />

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
        @apply flex flex-col w-full pt-6 m-0 box-border;
    }
</style>
