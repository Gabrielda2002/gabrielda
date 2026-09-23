import type { Stat } from "@/types/portfolio";
import { totalTechnologies } from "@/data/skills";

// La barra de stats del hero siempre dibuja 8 celdas (constante del diseño).
const BAR_CELLS = 8;

export const stats: Stat[] = [
  {
    value: "5+",
    label: "Proyectos completados",
    tone: "on",
    filled: 5,
    total: BAR_CELLS,
  },
  {
    value: String(totalTechnologies),
    label: "Tecnologías principales",
    tone: "lv",
    filled: totalTechnologies,
    total: BAR_CELLS,
  },
  {
    value: "100%",
    label: "Desarrollo web",
    tone: "hi",
    filled: BAR_CELLS,
    total: BAR_CELLS,
  },
];
