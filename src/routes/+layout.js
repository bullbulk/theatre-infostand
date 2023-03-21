import { loadData } from "$lib/utils.js";

export async function load({ fetch }) {
  await loadData(fetch).catch(() => {
  });
}
