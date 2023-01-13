import { Watch } from "./models";

class Controller {
  watches: Watch[];

  constructor() {
    this.watches = [];
  }

  render(): string {
    let result = `<h2>${this.watches.length} watches</h2>`;
    this.watches.forEach(w => result = result + this.renderWatchToHTML(w));
    return result;
  }

  renderWatchToHTML(watch: Watch) {
    let result = `<div><p>${watch.timezone}: ${watch.time.toLocaleString("fr-FR", {timeZone: watch.timezone})}</p></div>`;
    return result;
  }

  dispatchRerenderEvent() {
    document.dispatchEvent(new Event('rerender'));
  }

  addWatch(locale: string) {
    console.log(locale);
    this.watches.push(new Watch(locale));
    this.dispatchRerenderEvent();
  }
}

export {Controller}