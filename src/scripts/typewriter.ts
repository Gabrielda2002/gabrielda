// Máquina de escribir del diálogo del hero.
//
// Escribe el mensaje de `site.heroMessage` dentro de `#typed` preservando las
// marcas `<strong>` (se reinsertan conforme avanza el cursor). El cursor que
// parpadea vive FUERA de `#typed` en el marcado (`<span class="caret">`), así
// que aquí NO se inyecta ningún cursor adicional: el original producía dos.
//
// Detenciones: clic fuera de elementos interactivos, tecla Escape y un timeout
// de seguridad de 9s. Con `prefers-reduced-motion` se renderiza el mensaje
// completo de inmediato.
import { site } from "@/data/site";

interface Mark {
  start: number;
  end: number;
  len: number;
}

export function initTypewriter(): void {
  const typedEl = document.getElementById("typed");
  const caret = document.getElementById("caret");
  const MSG = site.heroMessage;

  function renderFull(): void {
    if (typedEl) typedEl.innerHTML = MSG;
    if (caret) caret.style.display = "none";
  }

  if (!typedEl) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    renderFull();
    return;
  }

  // Localiza los rangos de texto dentro de `<strong>`…</strong> en el plano
  // del texto sin etiquetas (el cursor itera sobre el texto plano).
  const marks: Mark[] = [];
  const re = /<strong>([^<]*)<\/strong>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(MSG)) !== null) {
    const idx = MSG.slice(0, m.index).replace(/<[^>]+>/g, "").length;
    marks.push({ start: idx, end: idx + m[1].length, len: m[1].length });
  }
  const plain = MSG.replace(/<[^>]+>/g, "");

  let done = false;
  let i = 0;

  function markHtml(upto: number): string {
    let out = "";
    let pos = 0;
    for (const mk of marks) {
      if (upto <= mk.start) continue;
      out += plain.slice(pos, mk.start);
      out +=
        "<strong>" +
        plain.slice(mk.start, Math.min(upto, mk.end)) +
        "</strong>";
      pos = Math.min(upto, mk.end);
    }
    out += plain.slice(pos, upto);
    return out;
  }

  function stop(): void {
    if (done) return;
    done = true;
    renderFull();
  }

  const tick = () => {
    if (done) return;
    i += 2;
    if (i >= plain.length) {
      stop();
      return;
    }
    typedEl.innerHTML = markHtml(i);
  };

  window.setInterval(tick, 22);

  document.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    if (!done && !target?.closest("a, button, input, textarea")) stop();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") stop();
  });

  window.setTimeout(stop, 9000);
}
