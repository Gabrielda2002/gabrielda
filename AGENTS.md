# Directivas del Proyecto y Activación Automática de Skills

Este archivo establece las reglas permanentes para el desarrollo en este proyecto. El asistente debe consultar y aplicar de manera proactiva las skills instaladas en `.agents/skills/` según el área de trabajo, sin requerir instrucción explícita del usuario en cada prompt.

---

## 1. Frontend, UI y Diseño
- **`frontend-design`**:
  - Aplicar obligatoriamente en cualquier creación o rediseño de interfaz, componentes, secciones o animaciones.
  - Priorizar estéticas modernas, microinteracciones, jerarquía tipográfica y paletas de color cuidadas (evitar diseños genéricos de plantilla).
- **`tailwind-css-patterns`**:
  - Usar patrones y buenas prácticas de Tailwind CSS para layouts responsivos (mobile-first), espaciados coherentes y componentes reutilizables.
- **`astro`**:
  - Seguir la arquitectura de islas de Astro, organización de componentes `.astro`, slots, props fuertemente tipadas y optimización de assets.

---

## 2. Calidad Web, Accesibilidad y SEO
- **`accessibility`**:
  - Garantizar cumplimiento de directrices WCAG 2.2: estructura semántica correcta (`<main>`, `<nav>`, `<section>`, etc.), roles y etiquetas ARIA pertinentes, contraste de color adecuado y accesibilidad por teclado.
- **`seo`**:
  - Incluir y verificar metadatos esenciales, etiquetas Open Graph, Twitter Cards, títulos descriptivos, descripciones canónicas y marcado semántico para motores de búsqueda.

---

## 3. TypeScript y Lógica de Negocio
- **`typescript-advanced-types`**:
  - Emplear tipado estricto en interfaces, props de Astro/React/Vue y utilidades. Evitar el uso de `any` no justificado y aprovechar tipos utilitarios o genéricos cuando corresponda.

---

## 4. Backend y Entorno Node.js (Servicios / APIs / Scripts)
- **`nodejs-backend-patterns`** y **`nodejs-best-practices`**:
  - Para cualquier endpoint, función server-side, endpoint API de Astro o script de Node.js: seguir patrones estructurados, manejo seguro de errores, validación de entradas y código asíncrono limpio.

---

## 5. Integración de Servidores MCP
- **`playwright`** (Inspección y Validación Visual):
  - Usar proactivamente para abrir la página en el navegador (`browser_navigate`, `browser_take_screenshot`), validar la correcta renderización de la UI, verificar responsividad en diferentes viewports e inspeccionar errores en consola (`browser_console_messages`).
- **`engram`** (Memoria Persistente y Contexto):
  - Consultar al inicio de tareas complejas (`mem_context`, `mem_search`) para recuperar decisiones técnicas previas, preferencias del usuario o patrones arquitectónicos acordados.
  - Guardar (`mem_save`) decisiones importantes, soluciones a bugs complejos o preferencias clave para mantener continuidad entre sesiones.
- **`context7`** (Documentación Oficial en Tiempo Real):
  - Utilizar (`resolve-library-id`, `query-docs`) cada vez que se requiera validar APIs, sintaxis o características de librerías y dependencias (Astro, Tailwind, librerías de iconos, animaciones, etc.) para evitar suposiciones desactualizadas.

---

## Flujo de Trabajo Obligatorio
Antes de generar o modificar código:
1. **Contexto & Memoria**: Consultar `engram` si la tarea depende de decisiones arquitectónicas previas.
2. **Documentación**: Consultar `context7` ante dudas sobre APIs o sintaxis de dependencias del proyecto.
3. **Skills Aplicables**: Identificar la tecnología y consultar el archivo `SKILL.md` correspondiente en `.agents/skills/<nombre-skill>/SKILL.md`.
4. **Validación Visual**: Al implementar o refactorizar interfaces, utilizar `playwright` para inspeccionar la página en el navegador y verificar visualmente los cambios.

