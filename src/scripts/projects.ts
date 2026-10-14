export function initProjects(): void {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>(".pj"));
  const panes = Array.from(document.querySelectorAll<HTMLElement>(".proj-pane"));

  if (tabs.length === 0 || panes.length === 0) return;

  function select(index: number, focus: boolean): void {
    tabs.forEach((tab, k) => {
      const on = k === index;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });

    panes.forEach((pane, k) => {
      const on = k === index;
      pane.hidden = !on;
      if (on) {
        pane.classList.remove("pd-swapping");
        void pane.offsetWidth;
        pane.classList.add("pd-swapping");
      }
    });

    if (focus) tabs[index].focus();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      select(Number(tab.dataset.i), false);
    });

    tab.addEventListener("keydown", (event) => {
      const i = Number(tab.dataset.i);
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        select((i + 1) % tabs.length, true);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        select((i - 1 + tabs.length) % tabs.length, true);
      } else if (event.key === "Home") {
        event.preventDefault();
        select(0, true);
      } else if (event.key === "End") {
        event.preventDefault();
        select(tabs.length - 1, true);
      }
    });
  });
}
