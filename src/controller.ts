import { Watch } from "./models";

class Controller {
  watches: Watch[];

  constructor() {
    this.watches = [new Watch("Europe/Paris")];
  }

  render(): string {
    let result = `<h2>${this.watches.length} watches</h2>`;
    this.watches.forEach((w) => (result = result + this.renderWatchToHTML(w)));
    return result;
  }

  renderWatchToHTML(watch: Watch) {
    let result = `<div id="${watch.id}" class="border">
    <p class="${watch.on ? "watch-on" : "watch-off"}">${
      watch.timezone
    }: ${watch.time.toLocaleString("fr-FR", {
      timeZone: watch.timezone,
    })}</p>
    <button id="lightButton">switch on/off</button>
    </div>`;
    return result;
  }

  getIndexOfWatchById(id: string) {
    return this.watches.findIndex((w) => w.id === id);
  }

  switchWatchLight(id: string) {
    this.watches[this.getIndexOfWatchById(id)].on =
      !this.watches[this.getIndexOfWatchById(id)].on;
    this.dispatchRerenderEvent();
  }

  dispatchRerenderEvent() {
    document.dispatchEvent(new Event("rerender"));
  }

  addWatch(locale: string) {
    this.watches.push(new Watch(locale));
    this.dispatchRerenderEvent();
  }
}

export { Controller };
