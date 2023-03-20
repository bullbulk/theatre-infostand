import { get, writable } from "svelte/store";

export const ssr = false;

const preloadedImages = writable([]);

export function preloadImage(src) {
  return new Promise(function(resolve) {
    let img = new Image();
    img.onload = resolve;
    img.src = src;
    img.style.cssText = "display: none";
    document.body.append(img); // prevent from being unload from memory
  });
}

export const preloadImages = (images) => {
  for (let i of images) {
    let image = i.event.image;
    if (get(preloadedImages).findIndex(image) === -1) {
      preloadImage(image);
    }
  }
};