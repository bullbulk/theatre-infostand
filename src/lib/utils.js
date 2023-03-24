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

export const isElementVisible = (element, parent = document.body) => {
  const { top, bottom, height } = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return top <= parentRect.top
    ? parentRect.top - top <= height
    : bottom - parentRect.bottom <= height;
};

const nextItemOffset = 3;
const skipTopItems = 2;

export const scrollToElement = (index, children, parent) => {
  let rowIndexToShow = index + nextItemOffset;

  if (rowIndexToShow >= children.length) {
    return;
  }
  if (!isElementVisible(children[rowIndexToShow], parent)) {
    parent.scrollTo({
      top: children[rowIndexToShow].scrollHeight * (index - skipTopItems),
      behavior: "smooth"
    });
  }
};