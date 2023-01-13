import { Mode, Watch } from "./models";
import { Controller } from "./controller";

class View {
  controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  renderTitleToHTML(): string {
    const suffix = this.controller.watches.length === 1 ? "watch" : "watches";
    return `${this.controller.watches.length} ${suffix}`;
  }

  renderWatchesToHTML(): string {
    let result = "";
    this.controller.watches.forEach(
      (w) => (result = result + this.renderWatchToHTML(w))
    );
    return result;
  }

  renderWatchToHTML(watch: Watch): string {
    const timeText = `${watch.time.toLocaleString()}`;
    const increaseDisabled = watch.isEditing() ? "" : "disabled";
    let increaseText = "increase";
    if (watch.mode === Mode.EditHour) {
      increaseText += " hours";
    } else if (watch.mode === Mode.EditMinute) {
      increaseText += " minutes";
    }

    let result = `<div id="${watch.id}" class="watch">
    <p class="watch-text ${watch.on ? "watch-on" : "watch-off"}${
      watch.isEditing() ? " editing" : ""
    }">${timeText}</p>
    <button class="lightButton">switch on/off</button>
    <button class="modeButton">mode</button>
    <button class="increaseButton" ${increaseDisabled}>${increaseText}</button>
    <button class="deleteButton">delete</button>
    </div>`;
    return result;
  }

  hydrateWatches() {
    this.controller.watches.forEach((w) => {
      const watchId = w.id;
      const watchDiv = document.getElementById(watchId);
      watchDiv!
        .getElementsByClassName("lightButton")[0]
        .addEventListener("click", () => {
          this.controller.handleWatchLight(watchId);
        });
      watchDiv!.querySelector(".modeButton")!.addEventListener("click", () => {
        this.controller.handleWatchMode(watchId);
      });
      watchDiv!
        .querySelector(".increaseButton")!
        .addEventListener("click", () => {
          this.controller.handleWatchIncrease(watchId);
        });
      watchDiv!
        .querySelector(".deleteButton")!
        .addEventListener("click", () => {
          this.controller.handleWatchDelete(watchId);
        });
    });
  }

  rerender() {
    document.getElementById("title")!.innerHTML = this.renderTitleToHTML();
    document.getElementById("watches")!.innerHTML = this.renderWatchesToHTML();
    this.hydrateWatches();
  }

  setup() {
    document.getElementById("addButton")?.addEventListener("click", () => {
      const city = (<HTMLSelectElement>(
        document.getElementById("newWatchSelect")
      )).value;
      this.controller.handleAddWatch(city);
    });

    document
      .getElementById("clearButton")
      ?.addEventListener("click", () => this.controller.handleClear());

    document.addEventListener("rerender", () => this.rerender());

    window.setInterval(() => this.controller.moveAll(), 1000);

    this.rerender();
  }
}

export { View };
