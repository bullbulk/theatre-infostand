export const ssr = false;

export function preloadImage(src) {
  return new Promise(function(resolve) {
    let img = new Image();
    img.onload = resolve;
    img.src = src;
    img.setAttribute("class", "hidden");
    img.style.cssText = "display: none";
    document.body.append(img); // prevent from being unload from memory
  });
}

export const preloadImages = (images) => {
  for (let i of images) {
    let image = i.event.image;
    if (document.querySelector(`img[src="${image}"].hidden`) === null) {
      preloadImage(image);
    }
  }
};