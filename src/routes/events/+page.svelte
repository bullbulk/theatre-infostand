<script>
  import { eventsData, getObjectById } from "$lib/store.js";
  import { fade } from "svelte/transition";
  import pushkin from "$lib/images/pushkin2.svg";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Autoclose from "$lib/components/Autoclose.svelte";
  import { goto } from "$app/navigation";
  import { scrollToElement } from "$lib/utils.js";
  import curtains from "$lib/images/curtains.svg";
  import duration from "$lib/images/duration.svg";
  import ruble from "$lib/images/ruble.svg";
  import { Modal } from "flowbite-svelte";

  $: selected = 0;
  $: currentEvent = $eventsData.events[selected];
  $: rows = [];
  $: showModal = false;
  $: currentPhoto = "";
  let sidebar;

  const setSelected = (index) => {
    selected = index;
    scrollToElement(index, rows, sidebar);
  };

  const clickRow = (index) => {
    setSelected(index);
  };

  const showPhoto = (src) => {
    currentPhoto = src;
    showModal = true;
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
  <Autoclose closeTimeout={60000} onClose={() => goto("/")}>
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
                  <div class="title">{event.title} {event.age_limit}</div>
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
            <div class="info-text container">
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
              <div class="upcoming-dates flex flex-col gap-2 pl-3">
                <div class="title">Ближайшие показы</div>
                <div class="flex gap-4">
                  {#each currentEvent.dates as i}
                    {@const date = getObjectById(i, $eventsData.dates)}
                    <a href="/?date={i}">
                      <div class="date-btn shadow-md">
                        <div class="date">{date.numerical_date}</div>
                        <div class="weekday">{date.weekday_full}</div>
                        <div class="time">{date.time}</div>
                      </div>
                    </a>
                  {:else}
                    <i>Ближайших показов нет.</i>
                  {/each}
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full justify-between px-24 py-6">
            <div class="flex gap-4 items-center justify-center">
              <img class="w-6 h-6" src="{curtains}" alt="Curtains">
              <p><b>Зал:</b> {currentEvent.hall.name}</p>
            </div>
            <div class="flex gap-3 items-center justify-center">
              <img class="w-6 h-6" src="{duration}" alt="Duration">
              <p><b>Длительность:</b> {currentEvent.duration}</p>
            </div>
            <div class="flex gap-3 items-center justify-center">
              <img class="w-6 h-6" src="{ruble}" alt="Curtains">
              <p><b>Цена:</b> {currentEvent.price} руб.</p>
            </div>
          </div>
          <hr class="divider">
        {/if}
        <div class="description" class:columns="{currentEvent.photos.length !== 0}">
          <div class="text scrollbar-thin scrollbar-thumb-gray-300">
            {@html currentEvent.description}
          </div>
          {#if currentEvent.photos.length !== 0}
            <div class="photos scrollbar-thin scrollbar-thumb-gray-300">
              {#each currentEvent.photos as i}
                {@const photo = getObjectById(i, $eventsData.photos)}
                <div on:click={() => showPhoto(photo.image)}
                     on:keydown={() => showPhoto(photo.image)}>
                  <img src="{photo.image}" alt="{currentEvent.title} photo">
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/key}
    </div>
    <Modal title="Просмотр фото" size="md" bind:open={showModal} autoclose>
      <Autoclose closeTimeout={30000} onClose={() => showModal = false}>
        <div>
          <img class="rounded-xl" src="{currentPhoto}" alt="Current">
        </div>
      </Autoclose>
    </Modal>
  </Autoclose>
</section>

<style lang="scss">
  #events-info {
    height: 72rem;
    font-size: 16pt;
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
    &.columns {
      grid-template-columns: 3fr 1fr;
      @apply grid gap-6;
    }

    .photos {
      height: 33rem;
      mask-image: linear-gradient(
                      to bottom,
                      rgba(255, 255, 255, .50) 0%,
                      rgba(255, 255, 255, 1) 10%,
                      rgba(255, 255, 255, 1) 90%,
                      rgba(255, 255, 255, .50) 100%
      );
      @apply flex flex-col gap-2 overflow-y-scroll;

      img {
        @apply rounded-xl;
      }
    }

    .text {
      height: 25rem;
      font-size: 14pt;
      // height: 20rem;
      mask-image: linear-gradient(to top, transparent, black 10%);
      @apply flex flex-col gap-4 indent-8 leading-relaxed overflow-y-scroll;
    }
  }

  hr.vertical {
    height: 8rem;
  }
</style>
