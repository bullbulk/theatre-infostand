import { writable } from "svelte/store";

export const upcomingEvents = writable([]);
export const upcomingEventsHash = writable("");
export const upcomingEventsFetcher = writable(null);