<script>
  import vk from "$lib/images/qr/vk.svg";
  import tg from "$lib/images/qr/tg.svg";
  import ok from "$lib/images/qr/ok.svg";
</script>

<footer>
  <div>
    <p><b>E-mail:</b> teatrast@list.ru</p>
    <p><b>Касса:</b> +7 (3466) 455-210</p>
    <p><b>Отдел по работе со зрителями:</b> <span>+7 (922) 255-16-05,</span>
      <span>+7 (3466) 561-605</span></p>
  </div>
  <div class="qr-codes">
    <img src="{vk}" alt="VK QR code">
    <img src="{tg}" alt="Telegram QR code">
    <img src="{ok}" alt="OK QR code">
  </div>
</footer>

<style>
    span {
        white-space: nowrap;
    }

    footer {
        @apply pb-24 grid grid-flow-col auto-cols-fr justify-between content-center ;
    }

    .qr-codes {
        @apply flex justify-end gap-6 h-24;
    }

    .qr-codes img {
        height: 100%;
    }
</style>