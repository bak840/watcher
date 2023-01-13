import { Controller } from "./controller";

// export function setupCounter(element: HTMLButtonElement) {
//   let counter = 0
//   const setCounter = (count: number) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

export function setupController() {
  let controller = new Controller();

  const rerender = () => document.getElementById("watches")!.innerHTML = controller.render();

  document.getElementById("newWachButton")?.addEventListener("click", () => {
    console.log("click");
    const locale = (<HTMLSelectElement>document.getElementById("newWatchSelect")).value;
    controller.addWatch(locale);
  })

  document.addEventListener("rerender", () => rerender());

  rerender();
}

setupController();