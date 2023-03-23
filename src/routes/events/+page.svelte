<script>
  import { eventsData, getObjectById } from "$lib/store.js";
  import { fade } from "svelte/transition";
  import { get } from "svelte/store";
  import pushkin from "$lib/images/pushkin2.svg";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Autoclose from "$lib/components/Autoclose.svelte";
  import { goto } from "$app/navigation";
  import { scrollToElement } from "$lib/utils.js";

  $: selected = 0;
  $: currentEvent = $eventsData.events[selected];
  $: rows = [];
  let sidebar;

  const setSelected = (index) => {
    if (selected === get(eventsData).dates.length - 1) {
      index = 0;
    }
    selected = index;
    scrollToElement(index, rows, sidebar);
  };

  const clickRow = (index) => {
    setSelected(index);
  };

  const event = Number.parseInt($page.url.searchParams.get("event"));
  onMount(() => {
    let firstLoad = true;
    eventsData.subscribe(() => {
      if (firstLoad) {
        let selectedIndex = $eventsData.events.indexOf(
          getObjectById(event, $eventsData.events)
        );
        if (selectedIndex !== -1) {
          setSelected(selectedIndex);
        }
      }
      firstLoad = false;
    });
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="pt-3">
  <Autoclose closeTimeout={10000} onClose={() => goto("/")}>
    <div class="relative">
      <div class="return top-5 left-5 flex flex-col gap-2 items-center">
        <div>
          <a class="rounded-lg px-4 py-1.5 border-2" href="/">На главную</a>
        </div>
        <!--      <div class="remaining">(автопереход через <span bind:this={timeLeftElement}></span> сек.)</div>-->
      </div>
      <div class="page-title">Спектакли</div>
    </div>
    <div id="events-info">
      <div id="events">
        {#key currentEvent.image}
          <div in:fade class="afisha-img">
            {#if currentEvent !== undefined}
              <img loading="lazy" src="{currentEvent.image}" alt="Afisha">
            {/if}
          </div>
        {/key}
        <div bind:this={sidebar} class="sidebar scrollbar-thin scrollbar-thumb-gray-200">
          {#each $eventsData.events as event, i}
            <div class="relative"
                 on:keydown={() => {clickRow(i)}}
                 on:click={() => {clickRow(i)}}>
              <div class="shadow-overlay" class:active="{i === selected}"></div>
              <div bind:this={rows[i]} class="row event-row">
                <div class="row-text pr-10">
                  <div class="author">{event.author}</div>
                  <div class="title">{event.title}</div>
                  <div class="genre">{event.genre}</div>
                  <hr>
                </div>
                <div class="flex flex-col justify-center h-full">
                  <img src="{event.image}" alt="Afisha">
                </div>
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
            <div in:fade class="grid-auto-cols container">
              <div class="additional-info pl-3">
                <div><b>Зал:</b> {currentEvent.hall.name}</div>
                <div><b>Длительность:</b> {currentEvent.duration}</div>
                <div class="flex gap-2">
                  <div><b>Цена:</b> {currentEvent.price} руб.</div>
                  <!--<img class="w-7 h-7 m-0" src="{pushkin}" alt="Pushkin">-->
                </div>
              </div>
            </div>
          </div>
        {/if}
        <hr class="divider">
        <div class="description scrollbar-thin scrollbar-thumb-gray-200">
          {@html currentEvent.description}
        </div>
      {/key}
    </div>
  </Autoclose>
</section>

<style lang="scss">
  #events-info {
    height: 72rem;
    @apply mt-6;
  }

  #events {
    height: 44rem;
    grid-template-columns: 1fr 1fr;
    @apply grid grid-flow-col mb-6;
  }

  .divider {
    @apply pb-6;
  }

  .event-row {
    grid-template-columns: 6fr 1fr;
    justify-content: stretch;
    @apply grid;
  }

  .event-info {
    grid-template-columns: 3fr 0 2fr;
    @apply pb-3;

    .info-text {
      .author {
        font-size: 14pt;
      }

      .title {
        font-size: 24pt;
      }

      .genre {
        font-size: 12pt
      }
    }
  }

  .description {
    font-size: 14pt;
    // height: 20rem;
    height: 35rem;
    mask-image: linear-gradient(to top, transparent, black 10%);
    @apply flex flex-col gap-4 indent-8 leading-relaxed overflow-y-scroll;
  }
</style>
