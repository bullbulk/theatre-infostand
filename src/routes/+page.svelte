<script>
  import { upcomingEvents } from "$lib/store.js";
  import { get } from "svelte/store";

  $: selected = 0;
  $: currentEvent = get(upcomingEvents)[0];

  console.log(upcomingEvents);
  console.log(currentEvent)
  const setSelected = (index) => {
    selected = index;
    currentEvent = get(upcomingEvents)[index];
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <hr class="pb-12">
  <div id="events-info">
    <div id="upcoming-events">
      <div class="afisha-img">
        <img src="{currentEvent.event.image}" alt="Afisha">
      </div>
      <div class="schedule">
        {#each $upcomingEvents as event, i}
          <div class="relative" on:keydown={() => {setSelected(i)}} on:click={() => {setSelected(i)}}>
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
    <div class="event-info">
      <div class="info-text">
        <div class="author">{currentEvent.event.author}</div>
        <div class="title">{currentEvent.event.title}</div>
        <div class="genre">{currentEvent.event.genre}</div>
      </div>
      <div></div>
    </div>
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
  }

  .info-text {
    @apply flex flex-col gap-2 py-3 px-12;
  }

  .afisha-img {
    max-height: 56rem;
    @apply flex flex-col justify-center w-full;
  }

  .afisha-img img {
    @apply rounded-lg;
  }
</style>
