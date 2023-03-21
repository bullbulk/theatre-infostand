<script>
  import { eventsData, getEvent } from "$lib/store.js";
  import { isElementVisible } from "$lib/utils.js";
  import { fade } from "svelte/transition";
  import { preloadImage } from "./preload.js";
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import pushkin from "$lib/images/pushkin2.svg";
  import qr_icon from "$lib/images/qr-icon.svg";

  $: selected = 0;
  $: currentDate = $eventsData.dates[selected];
  $: currentEvent = getEvent(currentDate.event);
  $: rows = [];
  let sidebar = null;

  let autoScrollInterval;
  const startAutoscroll = () => {
    autoScrollInterval = setInterval(() => setSelected(selected + 1), 10 * 1000);
  };
  const stopAutoscroll = () => {
    clearInterval(autoScrollInterval);
  };
  onDestroy(() => {
    clearInterval(autoScrollInterval);
  });

  const scrollToElement = (index) => {
    let rowIndexToShow = index + 1;
    if (index === rows.length - 1) {
      return;
    }
    if (!isElementVisible(rows[rowIndexToShow], sidebar)) {
      sidebar.scrollTo({
        top: rows[index].scrollHeight * (rowIndexToShow - 1),
        behavior: "smooth"
      });
    }
  };

  const setSelected = (index) => {
    if (selected === get(eventsData).dates.length - 1) {
      index = 0;
    }
    selected = index;
    scrollToElement(index);
  };

  const clickRow = (index) => {
    stopAutoscroll();
    startAutoscroll();
    setSelected(index);
  };

  onMount(() => {
    startAutoscroll();
    eventsData.subscribe((values) => {
      for (let i of values.events) {
        preloadImage(i.image);
      }
    });
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="pt-6">
  <hr class="divider">
  <div id="events-info">
    <div id="upcoming-events">
      {#key currentEvent.image}
        <div in:fade class="afisha-img">
          {#if currentEvent !== undefined}
            <img loading="lazy" src="{currentEvent.image}" alt="Afisha">
          {/if}
        </div>
      {/key}
      <div bind:this={sidebar} class="sidebar scrollbar-thin scrollbar-thumb-gray-200">
        {#each $eventsData.dates as item, i}
          {@const event = getEvent(item.event)}
          <div class="relative"
               on:keydown={() => {clickRow(i)}}
               on:click={() => {clickRow(i)}}>
            <div class="shadow-overlay" class:active="{i === selected}"></div>
            <div bind:this={rows[i]} class="row row-text">
              <div class="author">{event.author}</div>
              <div class="title">{event.title}</div>
              <div class="date">{item.date}, {item.time}</div>
              <hr>
            </div>
          </div>
        {/each}
      </div>
    </div>
    {#key currentEvent.title}
      {#if currentEvent !== undefined}
        <div class="event-info">
          <div in:fade class="info-text container">
            <div class="author">{currentEvent.author}</div>
            <div class="title">{currentEvent.title}</div>
            <div class="genre">{currentEvent.genre}</div>
            <div class="float-rt flex gap-4 mx-6">
              <div class="w-10 h-10">
                <img src="{pushkin}" alt="Pushkin">
              </div>
              <div class="age-limit">{currentEvent.age_limit}</div>
            </div>
          </div>
          <hr class="vertical">
          <div class="grid-auto-cols container">
            <div class="additional-info pl-3">
              <div><b>Зал:</b> {currentEvent.hall.name}</div>
              <div><b>Длительность:</b> {currentEvent.duration}</div>
              <div class="flex gap-2">
                <div><b>Цена:</b> {currentEvent.price} руб.</div>
                <!--<img class="w-7 h-7 m-0" src="{pushkin}" alt="Pushkin">-->
              </div>
              <div class="mt-4 flex">
                <a href="events/?event={currentEvent.id}">
                  <button class="open-description">Подробнее</button>
                </a>
                <button class="buy m-0 flex items-center gap-2">
                  <span>
                    <img class="w-4 h-4 m-0" src="{qr_icon}" alt="Pushkin">
                  </span>
                  Купить билет
                </button>
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/key}
  </div>
</section>

<style lang="scss">
  #upcoming-events {
    height: 60rem;
    grid-template-columns: 4fr 2fr;
    @apply grid grid-flow-col mb-6;
  }

  #events-info {
    height: 72rem;
  }

  .event-info {
    grid-template-columns: 3fr 0 2fr;
    @apply grid grid-flow-col justify-between;

    .info-text {
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
        @apply font-bold px-1;
      }
    }

    .container {
      @apply relative flex flex-col gap-2 py-3 px-6;
    }

    .additional-info {
      font-size: 14pt;
    }
  }

  .afisha-img {
    @apply flex flex-col justify-center w-full;
  }

  .afisha-img img {
    @apply rounded;
  }

  button {
    font-size: 12pt;
    @apply font-bold rounded-lg px-5 py-2 mr-2 mb-2;

    &.open-description {
      color: black;
      background-color: var(--accent);
    }

    &.buy {
      color: white;
      background-color: black;
    }
  }
</style>
