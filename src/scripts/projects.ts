// Selector de proyectos (lista de pestañas + panel de detalle).
//
// Gestiona `aria-selected` y `tabindex` de las pestañas, actualiza
// `aria-labelledby` del panel y renderiza etiquetas / título / descripción
// desde `@/data/projects`. Los enlaces de código y demo solo se muestran
// cuando su URL no está vacía; si ambos están vacíos, se oculta toda la fila.
import { projects } from "@/data/projects";

const TAG_ICON_MAP: Record<string, string> = {
  typescript: "tech-typescript",
  ts: "tech-typescript",
  react: "tech-react",
  "react native": "tech-react-native",
  astro: "tech-astro",
  tailwind: "tech-tailwind",
  "tailwind css": "tech-tailwind",
  nativewind: "tech-nativewind",
  "node.js": "tech-nodejs",
  node: "tech-nodejs",
  express: "tech-express",
  nestjs: "tech-nestjs",
  "nest.js": "tech-nestjs",
  mysql: "tech-mysql",
  postgresql: "tech-postgresql",
  postgres: "tech-postgresql",
  typeorm: "tech-typeorm",
  prisma: "tech-prisma",
  "prisma orm": "tech-prisma",
  expo: "tech-expo",
};

export function initProjects(): void {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>(".pj"));
  const pane = document.getElementById("pane");
  const pdImg = document.getElementById("pdImg") as HTMLImageElement | null;
  const pdEmpty = document.getElementById("pdEmpty");
  const pdCap = document.getElementById("pdCap");
  const pdTags = document.getElementById("pdTags");
  const pdTitle = document.getElementById("pdTitle");
  const pdDesc = document.getElementById("pdDesc");
  const pdLinks = document.getElementById("pdLinks");
  const pdRepo = document.getElementById("pdRepo");
  const pdRepoText = document.getElementById("pdRepoText");
  const pdRepoApi = document.getElementById("pdRepoApi");
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

    // Efecto de barrido / parpadeo CRT estilo Pokédex
    if (pane) {
      pane.classList.remove("pd-swapping");
      void pane.offsetWidth;
      pane.classList.add("pd-swapping");
      pane.setAttribute("aria-labelledby", `tab-${index}`);
    }

    // Imagen real o radar de búsqueda retro
    if (project.image && project.image.trim() !== "") {
      if (pdImg) {
        pdImg.src = project.image;
        pdImg.alt = `Captura de ${project.name}`;
        pdImg.hidden = false;
      }
      if (pdEmpty) pdEmpty.hidden = true;
    } else {
      if (pdImg) {
        pdImg.src = "";
        pdImg.hidden = true;
      }
      if (pdEmpty) pdEmpty.hidden = false;
    }

    // Cabecera / Categoría de la entrada
    if (pdCap) {
      pdCap.textContent = `REGISTRO #${String(index + 1).padStart(2, "0")} · ${project.type}`;
    }

    // Etiquetas con iconos pixel art dinámicos
    if (pdTags) {
      pdTags.replaceChildren(
        ...project.tags.map((t) => {
          const span = document.createElement("span");
          const iconName = TAG_ICON_MAP[t.toLowerCase().trim()];
          if (iconName) {
            const svg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            svg.setAttribute("class", "tag-ico");
            svg.setAttribute("viewBox", "0 0 16 16");
            svg.setAttribute("aria-hidden", "true");
            const use = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "use",
            );
            use.setAttribute("href", `#${iconName}`);
            svg.appendChild(use);
            span.appendChild(svg);
          }
          const txt = document.createTextNode(t);
          span.appendChild(txt);
          return span;
        }),
      );
    }
    if (pdTitle) pdTitle.textContent = project.title;
    if (pdDesc) pdDesc.textContent = project.description;

    const hasRepo = Boolean(project.repo && project.repo.trim() !== "");
    const hasRepoApi = Boolean(project.repoApi && project.repoApi.trim() !== "");
    const hasDemo = Boolean(project.demo && project.demo.trim() !== "");

    if (pdRepo) {
      pdRepo.hidden = !hasRepo;
      if (hasRepo) pdRepo.setAttribute("href", project.repo ?? "#");
      if (pdRepoText) {
        pdRepoText.textContent = hasRepoApi ? "Frontend" : "Código";
      }
    }

    if (pdRepoApi) {
      pdRepoApi.hidden = !hasRepoApi;
      if (hasRepoApi) pdRepoApi.setAttribute("href", project.repoApi ?? "#");
    }

    if (pdDemo) {
      pdDemo.hidden = !hasDemo;
      if (hasDemo) pdDemo.setAttribute("href", project.demo ?? "#");
    }

    if (pdLinks) pdLinks.hidden = !hasRepo && !hasRepoApi && !hasDemo;

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
