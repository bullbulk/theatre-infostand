import { upcomingEvents, upcomingEventsHash } from "$lib/store.js";
import { get } from "svelte/store";


export async function loadEvents(fetch = fetch) {
  let res, error;
  try {
    res = await fetch(`https://teatr.bullbulk.ru/api/infostand/upcoming/`).catch(() => error = true);
  } catch {
    error = true;
  }

  if (error) {
    console.log("Unable to connect");
    return;
  }

  if (res.status > 400) {
    throw error(res.status, await res.text());
  }

  let data = await res.json();

  if (get(upcomingEventsHash) !== data.hash) {
    upcomingEvents.set(data.values);
    upcomingEventsHash.set(data.hash);
  }
}