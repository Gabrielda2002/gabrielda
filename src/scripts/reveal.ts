// Aparición por scroll: un único IntersectionObserver compartido para todos
// los elementos `.reveal`. Cada elemento añade `.in` y deja de observarse al
// entrar en el viewport. Sin IO disponible o con `prefers-reduced-motion`,
// todo se muestra de inmediato.
export function initReveal(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduce) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );

  els.forEach((el) => io.observe(el));
}
