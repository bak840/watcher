import { Watch } from "./models";
import { Controller } from "./controller";

const controller = new Controller();

function renderWatchesToHTML(): string {
  let result = `<h2>${controller.watches.length} watches</h2>`;
  controller.watches.forEach((w) => (result = result + renderWatchToHTML(w)));
  return result;
}

function renderWatchToHTML(watch: Watch) {
  const text = `${watch.timezone}: ${watch.time.toLocaleString("fr-FR", {
    timeZone: watch.timezone,
  })}`;
  let result = `<div id="${watch.id}" class="border">
  <p class="${watch.on ? "watch-on" : "watch-off"}">${text}</p>
  <button id="lightButton">switch on/off</button>
  </div>`;
  return result;
}

function hydrateWatches() {
  controller.watches.forEach((w) => {
    const watchId = w.id;
    const watchDiv = document.getElementById(watchId);
    watchDiv!.querySelector("#lightButton")!.addEventListener("click", () => {
      controller.switchWatchLight(watchId);
    });
  });
}

function rerender() {
  document.getElementById("watches")!.innerHTML = renderWatchesToHTML();
  hydrateWatches();
}

document.getElementById("newWachButton")?.addEventListener("click", () => {
  const locale = (<HTMLSelectElement>document.getElementById("newWatchSelect"))
    .value;
  controller.addWatch(locale);
});

document.addEventListener("rerender", () => rerender());

rerender();
