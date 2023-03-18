import { error } from "@sveltejs/kit";
import { upcomingEvents } from "$lib/store.js";

export async function load({ fetch }) {
  const res = await fetch(`https://teatr.bullbulk.ru/api/infostand/upcoming/`);
  if (res.status > 400) {
    throw error(res.status, await res.text());
  }

  let data = await res.json();
  console.log(data);

  upcomingEvents.set(data.values);
}