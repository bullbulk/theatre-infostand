import { eventsData } from "$lib/store.js";
import { get } from "svelte/store";


export const loadData = async (fetch = fetch) => {
  let res, error;
  try {
    res = await fetch(`https://teatr.bullbulk.ru/api/infostand/`).catch(() => error = true);
  } catch {
    error = true;
  }

  if (error) {
    console.log("Unable to connect");
    return;
  }

  if (res.status > 400) {
    console.log(res.status, await res.text());
    return;
  }

  let data = await res.json();

  if (get(eventsData).hash !== data.hash) {
    eventsData.set(data);
  }
};

