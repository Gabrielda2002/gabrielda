// Scroll-spy de la navegación: resalta el enlace de la sección activa.
//
// Nota sobre IntersectionObserver: el comportamiento requerido es "la ÚLTIMA
// sección cuyo borde superior queda por encima de la línea del 35% del
// viewport". IO emite una señal binaria por sección y varias secciones pueden
// intersecar a la vez, por lo que no expresa esa semántica de forma fiable.
// Se usa por tanto un listener de scroll limitado con requestAnimationFrame que
// replica exactamente la lógica del diseño original.
export function initScrollSpy(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".nav a"),
  );
  const sections = links
    .map((a) =>
      document.querySelector<HTMLElement>(a.getAttribute("href") ?? ""),
    )
    .filter((el): el is HTMLElement => el !== null);

  if (sections.length === 0) return;

  const setActive = (id: string | null) => {
    for (const a of links) {
      const active = id !== null && a.getAttribute("href") === `#${id}`;
      a.classList.toggle("is-on", active);
      if (active) {
        a.setAttribute("aria-current", "true");
      } else {
        a.removeAttribute("aria-current");
      }
    }
  };

  const spy = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current: string | null = null;
    for (const s of sections) {
      if (s.offsetTop <= y) current = s.id;
    }
    setActive(current);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      spy();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  spy();
}
