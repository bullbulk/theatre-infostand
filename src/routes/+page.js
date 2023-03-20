import { loadData } from "$lib/utils.js";

export async function load({ fetch }) {
  loadData(fetch).catch(() => {
  });
}
