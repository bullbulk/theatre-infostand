<script>
  import { upcomingEvents, upcomingEventsFetcher } from "$lib/store.js";
  import { loadEvents } from "$lib/utils.js";
  import { fade, slide } from "svelte/transition";
  import { preloadImage } from "./preload.js";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  if (get(upcomingEventsFetcher) === null) {
    upcomingEventsFetcher.set(
      setInterval(() => loadEvents(fetch), 2 * 60 * 1000));
  }

  $: selected = 0;
  $: currentEvent = $upcomingEvents[selected] ?? { event: { title: "", image: "" } };

  let autoScrollInterval;
  const startAutoscroll = () => {
    autoScrollInterval = setInterval(() => setSelected(selected + 1), 5 * 10000);
  };
  const stopAutoscroll = () => {
    clearInterval(autoScrollInterval);
  };

  const setSelected = (index) => {
    if (selected === get(upcomingEvents).length - 1) {
      selected = 0;
    } else {
      selected = index;
    }
  };

  const clickRow = (index) => {
    stopAutoscroll();
    startAutoscroll();
    setSelected(index);
  };

  onMount(() => {
    startAutoscroll();
    upcomingEvents.subscribe((values) => {
      for (let i of values) {
        preloadImage(i.event.image);
      }
    });
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="pt-6">
  <hr class="pb-12">
  <div id="events-info">
    <div id="upcoming-events">
      {#key currentEvent.event.image}
        <div in:slide class="afisha-img">
          {#if currentEvent !== undefined}
            <img loading="lazy" src="{currentEvent.event.image}" alt="Afisha">
          {/if}
        </div>
      {/key}
      <div class="sidebar">
        {#each $upcomingEvents as event, i}
          <div class="relative"
               on:keydown={() => {clickRow(i)}}
               on:click={() => {clickRow(i)}}>
            <div class="shadow-overlay {i === selected ? 'active' : ''}">
            </div>
            <div class="row">
              <div class="author">{event.event.author}</div>
              <div class="title">{event.event.title}</div>
              <div class="date">{event.date}</div>
              <hr>
            </div>
          </div>
        {/each}
      </div>
    </div>
    {#key currentEvent.event.title}
      {#if currentEvent !== undefined}
        <div in:fade class="event-info">
          <div class="info-text">
            <div class="author">{currentEvent.event.author}</div>
            <div class="title">{currentEvent.event.title}</div>
            <div class="genre">{currentEvent.event.genre}</div>
            <div class="age-limit">16+</div>
          </div>
          <div></div>
        </div>
      {/if}
    {/key}
  </div>
</section>

<style lang="scss">
  #upcoming-events {
    height: 56rem;
    grid-template-columns: 4fr 1fr;
    @apply grid grid-flow-col mb-6;
  }

  #events-info {
    height: 72rem;
  }

  .event-info {
    min-height: 12rem;
    grid-template-columns: 3fr 2fr;
    @apply grid grid-flow-col justify-between;

    .info-text {
      @apply relative flex flex-col gap-2 my-3 mx-6;

      .author {
        color: var(--text-accent);
        font-size: 18pt;
        @apply font-bold;
      }

      .title {
        font-size: 28pt;
        font-weight: bold;
        line-height: 1.2em;
      }

      .genre {
        font-size: 14pt
      }

      .age-limit {
        font-size: 16pt;
        border: var(--accent) 4px solid;
        @apply absolute top-0 right-0 font-bold px-1;
      }
    }
  }

  .afisha-img {
    max-height: 56rem;
    @apply flex flex-col justify-center w-full;
  }

  .afisha-img img {
    @apply rounded-lg;
  }
</style>
