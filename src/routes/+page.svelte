<script>
  import { eventsData, getObjectById } from "$lib/store.js";
  import { scrollToElement } from "$lib/utils.js";
  import { fade } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import pushkin from "$lib/images/pushkin2.svg";
  import qr_icon from "$lib/images/qr-icon.svg";
  import Header from "./Header.svelte";
  import QrCode from "$lib/components/QrCode.svelte";
  import { Modal } from "flowbite-svelte";
  import Autoclose from "$lib/components/Autoclose.svelte";
  import { page } from "$app/stores";

  let autoScrollInterval;
  const startAutoscroll = () => {
    if (autoScrollInterval == null) {
      autoScrollInterval = setInterval(() => setSelected(selected + 1), 5 * 1000);
    }
  };
  const stopAutoscroll = () => {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  };
  onDestroy(() => {
    clearInterval(autoScrollInterval);
  });

  const setSelected = (index) => {
    if (selected === get(eventsData).dates.length - 1) {
      index = 0;
    }
    selected = index;
    scrollToElement(index, rows, sidebar);
  };

  const clickRow = (index) => {
    stopAutoscroll();
    startAutoscroll();
    setSelected(index);
  };

  $: selected = 0;
  $: currentDate = $eventsData.dates[selected];
  $: currentEvent = getObjectById(currentDate.event, $eventsData.events);
  $: rows = [];
  $: currentBuyUrl = "";
  let sidebar;
  $: showModal = false;
  $: {
    if (showModal === false) {
      startAutoscroll();
    } else {
      stopAutoscroll();
    }
  }

  onMount(() => {
    const date = Number.parseInt($page.url.searchParams.get("date"));

    let firstLoad = true;
    eventsData.subscribe(() => {
      if (firstLoad) {
        let selectedIndex = $eventsData.dates.indexOf(
          getObjectById(date, $eventsData.dates)
        );
        if (selectedIndex !== -1) {
          setSelected(selectedIndex);
        }
      }
      firstLoad = false;
    });

    startAutoscroll();
  });

  function showBuyWidget(url) {
    currentBuyUrl = url;
    showModal = true;
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<Header />

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
          {@const event = getObjectById(item.event, $eventsData.events)}
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
                {#if currentDate.buy_link}
                  <button
                    on:click={() => {showBuyWidget(currentDate.buy_link)}}
                    class="buy m-0 flex items-center gap-2">
                  <span>
                    <img class="w-4 h-4 m-0" src="{qr_icon}" alt="Pushkin">
                  </span>
                    Купить билет
                  </button>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/key}
    <Modal title="Покупка билета" size="xs" bind:open={showModal} autoclose>
      <Autoclose closeTimeout={30000} onClose={() => showModal = false}>
        <div class="flex flex-col justify-center items-center gap-8">
          <p>Отсканируйте QR-код, чтобы перейти на страницу покупки
            на сайте театра (<b>dramydramy.ru</b>)</p>
          <div>
            {#key currentBuyUrl}
              <QrCode url={currentBuyUrl} />
            {/key}
          </div>
          <div class="underscore">
            Покупка доступна только в кассе театра и на сайте <b>dramydramy.ru</b>
          </div>
        </div>
      </Autoclose>
      <svelte:fragment slot="footer">
        <button class="align-self-end">Закрыть</button>
      </svelte:fragment>
    </Modal>
  </div>
</section>

<style lang="scss">
  #upcoming-events {
    height: 58rem;
    grid-template-columns: 4fr 2fr;
    @apply grid grid-flow-col mb-6;
  }

  #events-info {
    height: 72rem;
  }

  button {
    font-size: 12pt;
    @apply rounded-lg px-5 py-2 mr-2 mb-2;

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
