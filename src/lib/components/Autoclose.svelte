<script>
  export let closeTimeout, onClose;

  import { onDestroy, onMount } from "svelte";

  const autocloseTime = closeTimeout ?? 60000;
  $: autoredirectTimeLeft = autocloseTime;
  let timeLeftElement, autocloseTimeLeft, autocloseTimeout, autocloseInterval;

  const startAutoclose = () => {
    autocloseInterval = setInterval(function() {
      autocloseTimeLeft = autocloseTimeLeft - 1000;
      if (timeLeftElement !== undefined) {
        timeLeftElement.innerHTML = (autocloseTimeLeft / 1000) % 60;
      }
    }, 1000);
    autocloseTimeout = setTimeout(function() {
      onClose()
    }, autocloseTime);
  };

  const stopAutoclose = () => {
    clearInterval(autocloseInterval);
    clearTimeout(autocloseTimeout);
  };

  const resetAutoclose = () => {
    stopAutoclose();
    autocloseTimeLeft = autocloseTime;
    startAutoclose();
  };

  onMount(() => {
    startAutoclose();
  });

  onDestroy(stopAutoclose);
</script>

<div on:click={resetAutoclose} on:keydown={resetAutoclose}>
  <slot />
</div>