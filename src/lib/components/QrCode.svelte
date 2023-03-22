<script>
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { fade } from "svelte/transition";

  export let url;

  async function getQrCode() {
    const res = await fetch(
      `https://teatr.bullbulk.ru/api/qr/`,
      {
        method: "POST",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "url": url })
      }
    );
    if (res.status >= 400) {
      throw error(res.status, res.statusText);
    }
    return URL.createObjectURL(await res.blob());
  }

  let promise;
  onMount(() => {
    promise = getQrCode();
  });
</script>

<div class="qr-code">
  {#await promise}
    <Loader />
  {:then qrUrl}
    <p><img in:fade src="{qrUrl}" alt="QrCode"></p>
  {:catch error}
    <p style="color: red">Произошла ошибка ({error.message})</p>
  {/await}
</div>

<style>
    .qr-code {
        max-width: 10rem;
        max-height: 10rem;
    }
</style>