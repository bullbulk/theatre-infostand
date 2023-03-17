<script>
  import afisha from "$lib/images/afisha.jpg";

  $: events = [
    {
      author: "Ярослава Пулинович",
      title: "Свой путь",
      date: "18 марта, 19:00",
      genre: "Лирическая трагикомедия в двух действиях"
    },
    {
      author: "Карел Чапек",
      title: "Настоящий детектив",
      date: "19 марта, 18:00",
      genre: "Кабаре-ревю в двух действиях"
    },
    {
      author: "Антон Чехов",
      title: "Супруга",
      date: "24 марта, 19:00",
      genre: "История одного \"развода\" в одном действии"
    },
    {
      author: "Уильям Шекспир",
      title: "Король Лир",
      date: "25 марта, 19:00",
      genre: "Шутовская трагедия в двух действиях"
    },
    {
      author: "Уильям Шекспир",
      title: "Король Лир",
      date: "26 марта, 18:00",
      genre: "Шутовская трагедия в двух действиях"
    },
    {
      author: "Нил Саймон",
      title: "Дураки",
      date: "30 марта, 19:00",
      genre: "Комедия в двух действиях"
    },
    {
      author: "Николай Гоголь",
      title: "Ревизор",
      date: "31 марта, 19:00",
      genre: "Нефантастическая комедия в двух действиях"
    },
    {
      author: "Николай Гоголь",
      title: "Ревизор",
      date: "1 апреля, 18:00",
      genre: "Нефантастическая комедия в двух действиях"
    },
    {
      author: "Аскар Галимов",
      title: "Ёжикина скрипка",
      date: "2 апреля, 11:00",
      genre: "Спектакль для семейного просмотра по сказкам Сергея Козлова"
    },
    {
      author: "Александр Островский",
      title: "Пароход \"Островский\"",
      date: "2 апреля, 11:00",
      genre: "Спектакль для семейного просмотра по сказкам Сергея Козлова"
    },
    {
      author: "Александр Островский",
      title: "Кошка, которая гуляла сама по себе",
      date: "2 апреля, 11:00",
      genre: "Спектакль для семейного просмотра по сказкам Сергея Козлова"
    }
  ];
  $: selected = 0;

  const setSelected = (index) => {
    selected = index;
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
        <img src="{afisha}" alt="Afisha">
      </div>
      <div class="schedule">
        {#each events as event, i}
          <div class="relative" on:keydown={() => {setSelected(i)}} on:click={() => {setSelected(i)}}>
            <div class="shadow-overlay {i === selected ? 'active' : ''}">
            </div>
            <div class="row">
              <div class="author">{event.author}</div>
              <div class="title">{event.title}</div>
              <div class="date">{event.date}</div>
              <hr>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="event-info">
      <div class="info-text">
        <div class="author">{events[selected].author}</div>
        <div class="title">{events[selected].title}</div>
        <div class="genre">{events[selected].genre}</div>
      </div>
      <div></div>
    </div>
  </div>
</section>

<style lang="scss">
  #upcoming-events {
    height: 56rem;
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
