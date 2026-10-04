export function initParallax(): void {
  const world = document.querySelector<HTMLElement>(".world");
  if (!world) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = world.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top, 0), rect.height);
    world.style.setProperty("--parallax", String(Math.round(progress)));
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
}
