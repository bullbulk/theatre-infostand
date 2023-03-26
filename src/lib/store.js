import { writable } from "svelte/store";

export const eventsData = writable({
  hash: "",
  events: [
    {
      id: 0, title: "", image: "", age_limit: "0+", duration: "",
      hall: { name: "" }, dates: [], photos: []
    }
  ],
  dates: [{
    id: 0, date: "", time: "", event: 0, buy_link: "",
    numerical_date: "", weekday_full: ""
  }],
  photos: [
    { id: 0, event: 0, image: "" }
  ]
});
export const dataFetcher = writable(null);


export const getObjectById = (id, array) => {
  return array.filter((v) => v.id === id)[0];
};