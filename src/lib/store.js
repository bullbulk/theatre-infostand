import { get, writable } from "svelte/store";

export const eventsData = writable({
  hash: "",
  events: [
    {
      id: 0, title: "", image: "", age_limit: "0+", duration: "",
      hall: { name: "" }
    }
  ],
  dates: [{ date: "", time: "", event: 0, buy_link: "" }]
});
export const dataFetcher = writable(null);


export const getEvent = (id) => {
  return get(eventsData).events.filter((v) => v.id === id)[0];
};