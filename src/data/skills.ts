import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    icon: "i-code",
    title: "Frontend",
    subtitle: "Interfaz y experiencia",
    items: [
      { name: "TypeScript", tag: "Tipado" },
      { name: "React", tag: "UI" },
      { name: "Astro", tag: "Sitios" },
      { name: "Tailwind CSS", tag: "Estilos" },
    ],
  },
  {
    icon: "i-server",
    title: "Backend",
    subtitle: "APIs y servicios",
    items: [
      { name: "Node.js", tag: "Runtime" },
      { name: "Express", tag: "REST" },
    ],
  },
  {
    icon: "i-db",
    title: "Base de datos",
    subtitle: "Persistencia",
    items: [
      { name: "MySQL", tag: "Relacional" },
      { name: "PostgreSQL", tag: "Relacional" },
    ],
  },
];

// Total de tecnologías derivado de los grupos (única fuente de verdad).
export const totalTechnologies = skillGroups.reduce(
  (sum, group) => sum + group.items.length,
  0,
);

// Nombres aplanados (solo el nombre) para las badges de "Tecnologías".
export const technologyBadges: string[] = skillGroups.flatMap((group) =>
  group.items.map((item) => item.name),
);
