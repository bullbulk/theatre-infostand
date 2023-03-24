import { writable } from "svelte/store";

export const eventsData = writable({
  hash: "",
  events: [
    {
      id: 0, title: "", image: "", age_limit: "0+", duration: "",
      hall: { name: "" }, dates: [0]
    }
  ],
  dates: [{
    date: "", time: "", event: 0, buy_link: "",
    numerical_date: "", weekday_full: ""
  }]
});
export const dataFetcher = writable(null);


export const getObjectById = (id, array) => {
  return array.filter((v) => v.id === id)[0];
};