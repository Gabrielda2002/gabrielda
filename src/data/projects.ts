import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "nordvital-app",
    name: "Nordvital App",
    type: "Full Stack",
    tags: ["React", "Node.js", "TypeORM", "TypeScript", "MySQL"],
    title: "Radicación médica y gestión hospitalaria en una misma plataforma.",
    caseStudy: {
      problem:
        "Gestionar la radicación médica, los permisos de acceso y los reportes de Nordvital IPS.",
      contribution:
        "Desarrollo full stack: interfaz en React, API modular, autenticación por roles y comunicación en tiempo real.",
      outcome:
        "Una plataforma con gestión hospitalaria, actualizaciones por WebSockets y generación de reportes en Excel y PDF.",
    },
    repo: "https://github.com/Gabrielda2002/radicar-app-frond",
    repoApi: "https://github.com/Gabrielda2002/Api-nordvital",
    demo: "https://app.nordvitalips.com",
    image: {
      src: "/projects/app.nordvitalips.webp",
      alt: "Panel de Nordvital App con bienvenida, centro de novedades y calendario de actividades.",
      width: 1920,
      height: 911,
    },
  },
  {
    id: "nordvital-ips",
    name: "Nordvital IPS",
    type: "Web app",
    tags: ["Astro", "React", "Tailwind CSS", "TypeScript"],
    title:
      "Servicios de salud y una red de 11 sedes al alcance de sus pacientes.",
    caseStudy: {
      problem:
        "Presentar los servicios de Nordvital IPS y facilitar la consulta de sus 11 sedes en Colombia.",
      contribution:
        "Rediseño y desarrollo del portal con Astro y React, mapas interactivos y sistema de radicación PQRSFD.",
      outcome:
        "Un portal que reúne el catálogo de servicios, medicina laboral, ubicación de sedes y canales de atención.",
    },
    repo: "https://github.com/Gabrielda2002/Page-Nordvital",
    demo: "https://nordvitalips.com",
    image: {
      src: "/projects/nordvitalips.webp",
      alt: "Página de inicio del portal institucional de Nordvital IPS.",
      width: 1920,
      height: 911,
    },
  },

  {
    id: "nordvital-ci",
    name: "Nordvital CI",
    type: "Sitio",
    tags: ["Astro", "React", "Tailwind CSS", "TypeScript"],
    title:
      "Investigación clínica y postulación de voluntarios en un solo lugar.",
    caseStudy: {
      problem:
        "Dar a conocer los ensayos clínicos del centro y recibir postulaciones de voluntarios.",
      contribution:
        "Desarrollo con Astro y React, formularios validados con React Hook Form y Zod, y pruebas unitarias con Jest.",
      outcome:
        "Una plataforma con catálogo de ensayos, información de los comités de ética y un flujo de postulación validado.",
    },
    repo: "https://github.com/Gabrielda2002/remake-landing-page-CI",
    demo: "https://investigation.nordvitalips.com",
    image: {
      src: "/projects/nordvital-ci.webp",
      alt: "Página de inicio del Centro de Investigación Clínica de Nordvital IPS.",
      width: 1920,
      height: 911,
    },
  },

  {
    id: "savebridge",
    name: "SaveBridge",
    type: "App móvil",
    tags: ["React Native", "Expo", "Node.js", "TypeScript"],
    title: "Tus partidas guardadas, sincronizadas entre Windows y Android.",
    caseStudy: {
      problem:
        "Mantener sincronizadas las partidas de emuladores y videojuegos entre el teléfono y el PC en una red local.",
      contribution:
        "App en React Native y Expo más un agente de escritorio en Node.js: emparejamiento QR, acceso a archivos y comparación SHA-256.",
      outcome:
        "Sincronización bidireccional con detección de conflictos y respaldos automáticos de las partidas.",
    },
    repo: "https://github.com/Gabrielda2002/SaveBridge",
    demo: "",
    image: {
      src: "/projects/saveBridge.webp",
      alt: "Pantalla completa de la aplicación móvil SaveBridge para sincronizar partidas guardadas.",
      width: 574,
      height: 1277,
    },
  },
  {
    id: "dashboard-nt",
    name: "Dashboard NT",
    type: "Panel",
    tags: ["NestJS", "Prisma", "Node.js", "TypeScript", "MySQL"],
    title: "Datos clínicos convertidos en métricas para la gestión de salud.",
    caseStudy: {
      problem:
        "Analizar costos médicos y desvíos frente a la Nota Técnica sobre más de 381 mil registros consolidados.",
      contribution:
        "API REST con NestJS y Prisma, consultas analíticas sobre datos SAP, PLENUS y PANA, caché en memoria y pruebas con Jest.",
      outcome:
        "Métricas para 5 dashboards gerenciales: procedimientos, costos, oportunidad médica y programas de prevención.",
    },
    repo: "https://github.com/Gabrielda2002/backend-auto",
    demo: "",
  },
];
