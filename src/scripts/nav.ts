// Menú móvil: alterna la clase `.open` del nav y mantiene `aria-expanded`.
// Mejora sobre el original: cierra también con la tecla Escape.
export function initNav(): void {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (!burger || !nav) return;

  const setOpen = (open: boolean) => {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  };

  burger.addEventListener("click", () => {
    setOpen(!nav.classList.contains("open"));
  });

  nav.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    if (target?.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      burger.focus();
    }
  });
}
