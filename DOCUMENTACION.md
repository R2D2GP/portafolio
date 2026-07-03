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

---

## Decisiones Técnicas

| # | Decisión | Alternativa | Motivo |
|---|----------|-------------|--------|
| 1 | `turbopack.root` apunta al propio directorio del proyecto | No configurar root | Next.js infería workspace root incorrectamente por múltiples package-lock.json en el sistema |
| 2 | `useSyncExternalStore` para mounted y prefersReduced | `useEffect` + `setState` | Nueva regla `react-hooks/set-state-in-effect` de eslint-config-next v16 bloquea setState dentro de useEffect. `useSyncExternalStore` es el patrón recomendado por React. |
| 3 | `isLocked` en contexto con ref sync para event handlers | Pasar por dependencia de useEffect | Los event listeners (wheel, touch, keydown) se registran una vez y viven en un closure. Usar state directamente causaría stale closures. |
| 4 | `createPortal` a `document.body` para el modal | Modal fijo dentro del árbol transformado | `fixed` se posiciona contra el containing block. `translateY` en WheelSnapLayout cambia el containing block, rompiendo el centrado del modal. |
| 5 | `typeof document !== "undefined"` para SSR guard | `useState` + `useEffect` para detectar cliente | La regla `react-hooks/set-state-in-effect` prohibe setState en useEffect. `typeof document` es síncrono y no viola la regla. |

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
│   │   ├── sections-agent/            ← AnimatedSection, SectionHeading, 7 secciones
│   │   ├── ui-agent/                  ← Button, Badge, Input, Textarea, utils
│   │   └── data-agent/                ← Tipos, technologies.ts, projects.ts, experience.ts
│   └── opencode.json                  ← Orquestación de agentes
├── src/
│   ├── app/
│   │   ├── layout.tsx                 ← Layout raíz (Providers → WheelSnapLayout → Sidebar + sections)
│   │   ├── page.tsx                   ← Renderiza 7 secciones en orden 0-6
│   │   ├── providers.tsx              ← ThemeProvider (next-themes, dark default)
│   │   └── globals.css                ← Variables CSS, dark mode, overflow hidden, reduced motion
│   ├── data/
│   │   ├── technologies.ts            ← Metodologías: Harness Engineering + SDD
│   │   ├── projects.ts                ← 2 proyectos con 3 URLs cada uno
│   │   └── experience.ts              ← 6 experiencias 2020-2025
│   ├── lib/
│   │   └── utils.ts                   ← cn() (clsx + tailwind-merge)
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.tsx            ← Desktop nav + mobile drawer (icono+label visible)
│   │   ├── shared/
│   │   │   ├── WheelSnapLayout.tsx    ← Context (currentIndex, scrollToSection, isLocked, setLocked) + snap logic + translateY
│   │   │   ├── AnimatedSection.tsx    ← Scroll-reveal wrapper (framer-motion useInView)
│   │   │   ├── SectionDots.tsx        ← Navegación por dots (7 indicadores)
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
│   │       ├── Experience.tsx         ← Sección 4: timeline 2020-2025
│   │       ├── Philosophy.tsx         ← Sección 5: filosofía de trabajo
│   │       └── Contact.tsx            ← Sección 6: email grande + redes, sin formulario
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
