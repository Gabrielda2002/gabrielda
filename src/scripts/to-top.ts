// Botón "volver arriba": aparece al superar 600px de scroll y desplaza al
// inicio (con desplazamiento suave salvo que se prefiera movimiento reducido).
export function initToTop(): void {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onScroll = () => {
    btn.classList.toggle("show", window.scrollY > 600);
  };

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
