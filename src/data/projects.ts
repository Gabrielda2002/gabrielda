import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "nordvital-ips",
    name: "Nordvital IPS",
    type: "Web app",
    tags: ["Astro", "React", "Tailwind CSS", "TypeScript"],
    title: "Portal Institucional & Red de Sedes",
    description:
      "Rediseño y desarrollo de la plataforma web institucional para Nordvital IPS (red con 11 sedes en Colombia). Arquitectura de islas con Astro y React, catálogo de servicios y medicina laboral, mapas interactivos georreferenciados, carruseles dinámicos y sistema de radicación PQRSFD.",
    repo: "https://github.com/Gabrielda2002/Page-Nordvital",
    demo: "https://nordvitalips.com",
    image: "/projects/nordvitalips.webp",
  },

  {
    id: "nordvital-ci",
    name: "Nordvital CI",
    type: "Sitio",
    tags: ["Astro", "React", "Tailwind CSS", "TypeScript"],
    title: "Centro de Investigación Clínica",
    description:
      "Plataforma web institucional y de captación de voluntarios para el Centro de Investigación Clínica de Nordvital IPS. Desarrollada con arquitectura de islas (Astro 5 y React 19), catálogo de ensayos clínicos, comités de ética, sistema de postulación con validaciones estrictas (React Hook Form, Zod) y suite de pruebas unitarias con Jest.",
    repo: "https://github.com/Gabrielda2002/remake-landing-page-CI",
    demo: "https://investigation.nordvitalips.com",
    image: "/projects/nordvital-ci.webp",
  },

  {
    id: "savebridge",
    name: "SaveBridge",
    type: "App móvil",
    tags: ["React Native", "Expo", "Node.js", "TypeScript"],
    title: "Sincronizador Multiplataforma de Partidas",
    description:
      "Ecosistema para sincronizar bidireccionalmente partidas guardadas de emuladores y videojuegos entre Windows y Android en red local. Monorepo con app móvil en React Native y Expo (escaneo de almacenamiento Scoped Storage, emparejamiento por QR con cámara y cálculo hash SHA-256) y agente de escritorio en Node.js con servidor REST, detección de conflictos y respaldos automáticos.",
    repo: "https://github.com/Gabrielda2002/SaveBridge",
    demo: "",
    image: "/projects/saveBridge.webp",
  },


  {
    id: "nordvital-app",
    name: "Nordvital App",
    type: "Full Stack",
    tags: ["React", "Node.js", "TypeORM", "TypeScript", "MySQL"],
    title: "Sistema de Radicación & Gestión Hospitalaria",
    description:
      "Plataforma integral Full Stack de gestión hospitalaria y radicación médica para Nordvital IPS. Frontend SPA reactivo desarrollado con React 19, Tailwind CSS, TanStack Query y Recharts; conectado a un backend modular con Node.js, Express, TypeORM y MySQL, autenticación JWT con roles y permisos, WebSockets en tiempo real y generación masiva de reportes en Excel/PDF.",
    repo: "https://github.com/Gabrielda2002/radicar-app-frond",
    repoApi: "https://github.com/Gabrielda2002/Api-nordvital",
    demo: "https://app.nordvitalips.com",
    image: "/projects/app.nordvitalips.webp",
  },
  {
    id: "dashboard-nt",
    name: "Dashboard NT",
    type: "Panel",
    tags: ["NestJS", "Prisma", "Node.js", "TypeScript", "MySQL"],
    title: "API Analítica de Costos Médicos vs. Nota Técnica",
    description:
      "API REST de analítica financiera y auditoría de salud para la alta gerencia de Nordvital IPS. Desarrollada con NestJS 11 y Prisma 7 sobre un motor de base de datos con más de 381k registros médicos consolidados (SAP/PLENUS/PANA); provee métricas para 5 dashboards gerenciales: Pareto 80/20 de procedimientos (CUPS), desvíos de Nota Técnica, oportunidad médica y programas PyM/RIAS con caché en memoria y suite de pruebas en Jest.",
    repo: "https://github.com/Gabrielda2002/backend-auto",
    demo: "",
    image: "/projects/dashboard-nt.webp",
  },
];
