import { Controller } from "./controller";

export function setupController() {
  let controller = new Controller();

  const rerender = () => {
    document.getElementById("watches")!.innerHTML = controller.render();
    hydrateWatches();
  };

  const hydrateWatches = () => {
    controller.watches.forEach((w) => {
      const watchId = w.id;
      const watchDiv = document.getElementById(watchId);
      watchDiv!.querySelector("#lightButton")!.addEventListener("click", () => {
        controller.switchWatchLight(watchId);
      });
    });
  };

  document.getElementById("newWachButton")?.addEventListener("click", () => {
    const locale = (<HTMLSelectElement>(
      document.getElementById("newWatchSelect")
    )).value;
    controller.addWatch(locale);
  });

  document.addEventListener("rerender", () => rerender());

  rerender();
}

setupController();
