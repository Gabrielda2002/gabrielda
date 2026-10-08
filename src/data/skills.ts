import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    icon: "i-code",
    title: "Frontend",
    subtitle: "Interfaz y experiencia",
    items: [
      { name: "TypeScript", tag: "Tipado", icon: "tech-typescript" },
      { name: "React", tag: "UI", icon: "tech-react" },
      { name: "Astro", tag: "Sitios", icon: "tech-astro" },
      { name: "Tailwind CSS", tag: "Estilos", icon: "tech-tailwind" },
    ],
  },
  {
    icon: "i-server",
    title: "Backend",
    subtitle: "APIs y servicios",
    items: [
      { name: "Node.js", tag: "Runtime", icon: "tech-nodejs" },
      { name: "Express", tag: "REST", icon: "tech-express" },
    ],
  },
  {
    icon: "i-db",
    title: "Base de datos",
    subtitle: "Persistencia",
    items: [
      { name: "MySQL", tag: "Relacional", icon: "tech-mysql" },
      { name: "PostgreSQL", tag: "Relacional", icon: "tech-postgresql" },
    ],
  },
];

// Total de tecnologías derivado de los grupos (única fuente de verdad).
export const totalTechnologies = skillGroups.reduce(
  (sum, group) => sum + group.items.length,
  0,
);

export interface TechnologyBadge {
  name: string;
  icon: (typeof skillGroups)[number]["items"][number]["icon"];
}

// Lista aplanada de tecnologías con su icono para las badges de "Sobre mí".
export const technologyBadges: TechnologyBadge[] = skillGroups.flatMap((group) =>
  group.items.map((item) => ({ name: item.name, icon: item.icon })),
);

