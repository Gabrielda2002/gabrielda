// Alternancia día/noche del HUD.
//
// `aria-pressed` se mantiene sincronizado con el estado: vale "true" cuando el
// tema activo es "night" (botón "pulsado" = noche activa). Así el estado queda
// expuesto a lectores de pantalla de forma coherente con el diseño.
export function initThemeToggle(): void {
  const root = document.documentElement;
  const KEY = "gd-theme";
  const btn = document.getElementById("themeBtn");
  if (!btn) return;

  const isNight = () => root.getAttribute("data-theme") === "night";

  const syncPressed = () => {
    btn.setAttribute("aria-pressed", isNight() ? "true" : "false");
  };

  btn.addEventListener("click", () => {
    const next = isNight() ? "day" : "night";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* almacenamiento no disponible */
    }
    syncPressed();
  });

  // Sincroniza el estado inicial (por si el tema se decidió antes del pintado).
  syncPressed();
}
