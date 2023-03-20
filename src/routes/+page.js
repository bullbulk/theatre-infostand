import { loadEvents } from "$lib/utils.js";

export async function load({ fetch }) {
  loadEvents(fetch).catch(() => {
  });
}
