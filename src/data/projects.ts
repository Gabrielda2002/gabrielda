import type { Project } from "@/types/portfolio";

// TODO: completar `repo`, `demo` e `image` con los datos reales de cada proyecto.
export const projects: Project[] = [
  {
    id: "mobile-app",
    name: "Mobile App",
    type: "App móvil",
    tags: ["React Native", "Expo", "NativeWind", "NestJS", "TypeORM"],
    title: "App Móvil Multiplataforma",
    description:
      "Aplicación móvil desarrollada con React Native, Expo y NativeWind. Arquitectura backend modular con NestJS, autenticación segura y persistencia de datos con TypeORM.",
    repo: "",
    demo: "",
    image: "",
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    type: "Web app",
    tags: ["React", "Express", "PostgreSQL"],
    title: "TaskFlow",
    description:
      "App de gestión de tareas colaborativas con tableros Kanban, tiempo real y autenticación JWT. Diseñada para equipos pequeños.",
    repo: "",
    demo: "",
    image: "",
  },

  {
    id: "devblog",
    name: "DevBlog",
    type: "Sitio",
    tags: ["Astro", "TypeScript", "Tailwind"],
    title: "DevBlog",
    description:
      "Blog personal de tecnología con Astro, MDX, búsqueda full-text y modo oscuro. Optimizado para Core Web Vitals.",
    repo: "",
    demo: "",
    image: "",
  },
  {
    id: "invoicely",
    name: "Invoicely",
    type: "Panel",
    tags: ["Node.js", "Express", "MySQL"],
    title: "Invoicely",
    description:
      "Sistema de facturación web con generación de PDF, panel de métricas y multi-tenant. Integración con pasarelas de pago.",
    repo: "",
    demo: "",
    image: "",
  },
];
