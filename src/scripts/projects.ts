// Selector de proyectos (lista de pestañas + panel de detalle).
//
// Gestiona `aria-selected` y `tabindex` de las pestañas, actualiza
// `aria-labelledby` del panel y renderiza etiquetas / título / descripción
// desde `@/data/projects`. Los enlaces de código y demo solo se muestran
// cuando su URL no está vacía; si ambos están vacíos, se oculta toda la fila.
import { projects } from "@/data/projects";

export function initProjects(): void {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>(".pj"));
  const pane = document.getElementById("pane");
  const pdTags = document.getElementById("pdTags");
  const pdTitle = document.getElementById("pdTitle");
  const pdDesc = document.getElementById("pdDesc");
  const pdLinks = document.getElementById("pdLinks");
  const pdRepo = document.getElementById("pdRepo");
  const pdDemo = document.getElementById("pdDemo");

  if (tabs.length === 0) return;

  function select(index: number, focus: boolean): void {
    const project = projects[index];
    if (!project) return;

    tabs.forEach((tab, k) => {
      const on = k === index;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });

    if (pdTags) {
      pdTags.replaceChildren(
        ...project.tags.map((t) => {
          const span = document.createElement("span");
          span.textContent = t;
          return span;
        }),
      );
    }
    if (pdTitle) pdTitle.textContent = project.title;
    if (pdDesc) pdDesc.textContent = project.description;

    const hasRepo = Boolean(project.repo);
    const hasDemo = Boolean(project.demo);
    if (pdRepo) {
      pdRepo.hidden = !hasRepo;
      if (hasRepo) pdRepo.setAttribute("href", project.repo ?? "#");
    }
    if (pdDemo) {
      pdDemo.hidden = !hasDemo;
      if (hasDemo) pdDemo.setAttribute("href", project.demo ?? "#");
    }
    if (pdLinks) pdLinks.hidden = !hasRepo && !hasDemo;

    if (pane) pane.setAttribute("aria-labelledby", `tab-${index}`);
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

  select(0, false);
}
