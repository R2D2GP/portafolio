# Documentación del Portafolio

Bitácora de cambios, decisiones y modificaciones del proyecto `portafolio-final`.

---

## Registro de Cambios

| Fecha | Fase | Archivos Modificados | Descripción | Decisión / Nota |
|-------|------|----------------------|-------------|-----------------|
| 2026-07-03 | 1 | package.json, tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs, .gitignore, next-env.d.ts, src/app/*, public/*, node_modules/ | Scaffold con create-next-app + instalación de dependencias adicionales | Se usó `--turbopack` como bundler. Se agregó `turbopack.root` en next.config.ts para evitar warning de múltiples lockfiles. |
| 2026-07-03 | 2 | globals.css, utils.ts, Button.tsx, WheelSnapLayout.tsx, SectionDots.tsx, ThemeToggle.tsx, Sidebar.tsx, providers.tsx, layout.tsx, page.tsx | Sistema de layout completo: WheelSnapLayout, Sidebar desktop+drawer, SectionDots, ThemeToggle, providers, layout raíz | Se usó `useSyncExternalStore` en vez de `useEffect`+`setState` para evitar la nueva regla `react-hooks/set-state-in-effect` de Next.js 16. |
| 2026-07-03 | 3 | Badge.tsx, Input.tsx, Textarea.tsx | UI Kit completo: Badge con variantes, Input y Textarea con forwardRef | Creado por ui-agent vía task tool. |
| 2026-07-03 | 4 | technologies.ts, projects.ts, experience.ts | Data layer: 3 interfaces y datos placeholder (16 tecnologías, 5 proyectos, 6 experiencias) | Creado por data-agent vía task tool. |
| 2026-07-03 | 5 | AnimatedSection.tsx, SectionHeading.tsx, Hero.tsx, About.tsx, Technologies.tsx, Projects.tsx, Experience.tsx, Philosophy.tsx, Contact.tsx | 7 secciones + 2 componentes compartidos (9 archivos) | Creado por sections-agent vía task tool. Se corrigió Projects.tsx: lucide-react no tiene icono Github, se reemplazó por SVG inline. |
| 2026-07-03 | 6 | page.tsx | Integración: page.tsx importa y renderiza las 7 secciones | WheelSnapLayout + Sidebar ya estaban en layout.tsx desde Fase 2. |
| 2026-07-03 | 7 | WheelSnapLayout.tsx, Projects.tsx | Modal lock + Portal: cuando el modal de Projects está abierto se bloquea el scroll programático (wheel, touch, teclado). Modal renderizado via `createPortal` a `document.body` para evitar que `translateY` del snap rompa el `fixed` | `isLocked` en contexto WheelSnapLayout, sincronizado via ref para evitar stale closures. Guard `typeof document !== "undefined"` para SSR. |
| 2026-07-03 | 7 | Projects.tsx, projects.ts | Reducción a 2 proyectos y nuevos botones: conservados solo `ai-code-assistant` y `saas-automation`. Botón "Demo" reemplazado por "Presentación", "Introducción", "Manual" con URLs por proyecto | Interface Project: `demoUrl` → `presentacionUrl`, `introduccionUrl`, `manualUrl`. |
| 2026-07-03 | 7 | technologies.ts, Technologies.tsx, page.tsx, Sidebar.tsx | Sección "Tecnologías" reemplazada por "Metodologías": Harness Engineering y Spec-Driven Development (SDD). Sidebar label actualizado. | Interface `Technology` → `Methodology` con `principles[]`. 2 cards grandes con descripción y lista de principios. |
| 2026-07-06 | 8 | globals.css, Button.tsx, Badge.tsx, Input.tsx, Textarea.tsx, SectionDots.tsx, Sidebar.tsx, Hero.tsx, About.tsx, Philosophy.tsx, Projects.tsx, Contact.tsx, technologies.ts, DOCUMENTACION.md | Nueva paleta de colores sólidos — primary #68C3A9, links #82BAAA, hover #BBE4D8, glow #C5FAEB, dark-bg #344147. Eliminados todos los degradados y colores blue/violet/green. Modales actualizados con acentos primary. | Colores definidos como theme tokens en globals.css via `@theme inline`. `projectMeta.gradient` reemplazado por overlay sólido `bg-primary/5`. Sin `bg-gradient-*`, `from-*`, `to-*`, `via-*` en todo el proyecto. |
| 2026-07-06 | 9 | projects.ts, Projects.tsx, public/projects/ai-code-assistant.png, public/projects/saas-automation.png, WheelSnapLayout.tsx, DOCUMENTACION.md | Reemplazo de proyectos placeholder por reales: FerreClick Arequipa y Notas Eximp Frereg. Eliminados emojis e íconos de features. Scroll de wheel funciona dentro del modal. | Imágenes renombradas a `ferreclick-aqp.png` y `notas-eximp.png`. `ProjectFeature.icon` eliminado del interface. `preventDefault` en wheel handler movido después del chequeo `isLocked`. |
| 2026-07-07 | 10 | About.tsx, Philosophy.tsx, Contact.tsx | Texto de About renovado. Filosofía reescrita con nuevo lema y tarjetas: AI-Native Development, Agentic Systems, Human-Centered Automation, Scalable Architecture. Email actualizado. | —
| 2026-07-07 | 11 | technologies.ts, Technologies.tsx | Metodologías reemplazadas por 4 nuevas: Harness Engineering, Loop Engineering, Agent Orchestration, Spec-Driven Development (SDD). Sección renombrada a "Engineering Principles". | Sin emojis. Subtítulo actualizado a: "Principios de ingeniería que aplico para construir sistemas escalables, confiables y AI-First." |
| 2026-07-08 | 12 | `.opencode/skills/ui-ux-pro-max/` (nuevo directorio) | Instalación del skill UI/UX Pro Max via `npx uipro-cli init --ai opencode`. Incluye SKILL.md, data/ (componentes, layouts, pages, patterns, formularios, etc.) y scripts/ (animaciones, colores, tipografía). | Fuente: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

---

## Paleta de Colores

Colores sólidos (sin degradados) definidos como theme tokens en `globals.css` vía `@theme inline`:

| Token       | Hex       | Uso                                         |
|-------------|-----------|---------------------------------------------|
| `primary`   | `#68C3A9` | Acento principal: botones, badges, enlaces   |
| `links`     | `#82BAAA` | Texto de enlaces secundarios                |
| `hover`     | `#BBE4D8` | Hover en cards, botones, links              |
| `glow`      | `#C5FAEB` | Efectos blur/brillo y `::selection`         |
| `dark-bg`   | `#344147` | Fondo dark (reemplaza zinc-900/950)         |

Usar como clases Tailwind: `bg-primary`, `text-primary`, `border-primary/20`, `bg-glow/20`, etc.

**Regla**: No usar `bg-gradient-*`, `from-*`, `to-*`, `via-*` — todo color sólido.

---

## Decisiones Técnicas

| # | Decisión | Alternativa | Motivo |
|---|----------|-------------|--------|
| 1 | `turbopack.root` apunta al propio directorio del proyecto | No configurar root | Next.js infería workspace root incorrectamente por múltiples package-lock.json en el sistema |
| 2 | `useSyncExternalStore` para mounted y prefersReduced | `useEffect` + `setState` | Nueva regla `react-hooks/set-state-in-effect` de eslint-config-next v16 bloquea setState dentro de useEffect. `useSyncExternalStore` es el patrón recomendado por React. |
| 3 | `isLocked` en contexto con ref sync para event handlers | Pasar por dependencia de useEffect | Los event listeners (wheel, touch, keydown) se registran una vez y viven en un closure. Usar state directamente causaría stale closures. |
| 4 | `createPortal` a `document.body` para el modal | Modal fijo dentro del árbol transformado | `fixed` se posiciona contra el containing block. `translateY` en WheelSnapLayout cambia el containing block, rompiendo el centrado del modal. |
| 5 | `typeof document !== "undefined"` para SSR guard | `useState` + `useEffect` para detectar cliente | La regla `react-hooks/set-state-in-effect` prohibe setState en useEffect. `typeof document` es síncrono y no viola la regla. |
| 6 | Paleta sólida unificada (primary #68C3A9) | Mantener gradientes blue/violet/green por sección | Consistencia visual. Paleta más profesional y moderna. Elimina dependencia de múltiples colores acento. Definida como theme tokens Tailwind vía `@theme inline`. |
| 7 | `e.preventDefault()` después del chequeo `isLocked` en wheel handler | Llamar `preventDefault` siempre | Cuando el modal está abierto, el wheel event debe pasar al contenido del modal (`overflow-y: auto`) sin ser interceptado por el snap. Mover `preventDefault` después del early return por `isLocked` permite el scroll natural dentro del modal. |

---

## Problemas Conocidos

| # | Descripción | Estado | Solución |
|---|-------------|--------|----------|
| | | | |

---

## Estructura del Proyecto

```
portafolio-final/
├── .opencode/                         ← Agentes y orquestación (creados)
│   ├── agents/
│   │   ├── layout-agent/              ← WheelSnapLayout, Sidebar, SectionDots, ThemeToggle, globals.css
│   │   ├── sections-agent/            ← AnimatedSection, SectionHeading, 6 secciones
│   │   ├── ui-agent/                  ← Button, Badge, Input, Textarea, utils
│   │   └── data-agent/                ← Tipos, technologies.ts, projects.ts
│   └── opencode.json                  ← Orquestación de agentes
├── src/
│   ├── app/
│   │   ├── layout.tsx                   ← Layout raíz (Providers → WheelSnapLayout → Sidebar + sections)
│   │   ├── page.tsx                   ← Renderiza 6 secciones en orden 0-5
│   │   ├── providers.tsx              ← ThemeProvider (next-themes, dark default)
│   │   └── globals.css                ← Variables CSS, dark mode, overflow hidden, reduced motion
│   ├── data/
│   │   ├── technologies.ts            ← Metodologías: Harness Engineering + SDD
│   │   └── projects.ts                ← FerreClick Arequipa y Notas Eximp Frereg (datos reales)
│   ├── lib/
│   │   └── utils.ts                   ← cn() (clsx + tailwind-merge)
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.tsx            ← Desktop nav + mobile drawer (icono+label visible)
│   │   ├── shared/
│   │   │   ├── WheelSnapLayout.tsx    ← Context (currentIndex, scrollToSection, isLocked, setLocked) + snap logic + translateY
│   │   │   ├── AnimatedSection.tsx    ← Scroll-reveal wrapper (framer-motion useInView)
│   │   │   ├── SectionDots.tsx        ← Navegación por dots (6 indicadores)
│   │   │   ├── SectionHeading.tsx     ← Título + subtítulo con alineación
│   │   │   └── ThemeToggle.tsx        ← Dark/light toggle (next-themes, framer-motion)
│   │   ├── ui/
│   │   │   ├── Button.tsx             ← CVA + Slot
│   │   │   ├── Badge.tsx              ← 3 variantes (default, primary, secondary)
│   │   │   ├── Input.tsx              ← forwardRef
│   │   │   └── Textarea.tsx           ← forwardRef
│   │   └── sections/
│   │       ├── Hero.tsx               ← Sección 0: intro + CTA
│   │       ├── About.tsx              ← Sección 1: sobre mí
│   │       ├── Technologies.tsx       ← Sección 2: Metodologías (exporta Methodologies)
│   │       ├── Projects.tsx           ← Sección 3: 2 proyectos con modal expandible (createPortal)
│   │       ├── Philosophy.tsx         ← Sección 4: filosofía de trabajo
│   │       └── Contact.tsx            ← Sección 5: email grande + redes, sin formulario
│   ├── public/                        ← Assets estáticos
├── FLUJO_DE_TRABAJO.md
├── DOCUMENTACION.md
└── ...
```

---

## Convenciones del Código

- **Nombres de archivos**: PascalCase para componentes (e.g. `Button.tsx`), camelCase para datos (e.g. `technologies.ts`).
- **Exportaciones**: Named exports siempre (`export function Button`), no default exports.
- **"use client"**: Solo en componentes que usan hooks de React (useState, useEffect, useContext), eventos del navegador, o animaciones de framer-motion.
- **Next.js 16 lint**: La regla `react-hooks/set-state-in-effect` prohíbe `setState` directo dentro de `useEffect`. Usar `useSyncExternalStore` como alternativa. No usar `eslint-disable` para esta regla.
- **Path alias**: Usar `@/` para importar desde `src/`.
- **Estilos**: Tailwind CSS v4, con variables CSS para tema claro/oscuro.
- **Sin degradados**: No usar `bg-gradient-*`, `from-*`, `to-*`, `via-*`. Solo colores sólidos. Usar los tokens `primary`, `links`, `hover`, `glow` del theme.
