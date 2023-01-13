import { Watch } from "./models";

class Controller {
  watches: Watch[];

  constructor() {
    this.watches = [new Watch("Europe/Paris")];
  }

  dispatchRerenderEvent() {
    document.dispatchEvent(new Event("rerender"));
  }

  getIndexOfWatchById(id: string) {
    return this.watches.findIndex((w) => w.id === id);
  }

  addWatch(locale: string) {
    this.watches.push(new Watch(locale));
    this.dispatchRerenderEvent();
  }

  switchWatchLight(id: string) {
    const watchIndex = this.getIndexOfWatchById(id);
    this.watches[watchIndex].on = !this.watches[watchIndex].on;
    this.dispatchRerenderEvent();
  }
}

export { Controller };
