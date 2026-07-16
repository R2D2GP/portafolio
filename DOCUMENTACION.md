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
| 2026-07-08 | 13 | Hero.tsx, layout.tsx, globals.css, Sidebar.tsx, SectionDots.tsx, Projects.tsx, Contact.tsx, Technologies.tsx, technologies.ts | **Fase A — Accesibilidad**: `focus-visible` rings en Sidebar, Contact, Projects, SectionDots. `role="button"` + `tabIndex` + keyboard handler en project cards. | WCAG AA — feedback visual para navegación por teclado.
| 2026-07-08 | 13 | Sidebar.tsx, Projects.tsx | **Fase B — Glassmorphism**: Sidebar `backdrop-blur-xl` → `backdrop-blur-2xl` + `bg-white/60`. Modal overlay `backdrop-blur-sm` → `backdrop-blur-md`. Modal card `backdrop-blur-sm`. Project cards con `backdrop-blur-[2px]` y hover translúcido. | Efecto vidrio moderno sin usar degradados.
| 2026-07-08 | 13 | layout.tsx, globals.css, Sidebar.tsx | **Fase C — Tipografía**: Geist reemplazado por Archivo (headings, `--font-heading`) + Space Grotesk (body, `--font-body`). Body usa `font-sans → var(--font-body)`. Headings `h1-h6` usan `var(--font-heading)`. Brand text en Sidebar con `font-heading`. | Archivo + Space Grotesk bajo SIL OFL 1.1 (libre uso). Pairing "Minimalist Portfolio" recomendado por UI/UX Pro Max.
| 2026-07-08 | 13 | SectionDots.tsx, technologies.ts, Technologies.tsx | **Fase D — Refactor menor**: SectionDots label "Metodologías" → "Engineering Principles". Colores inline `#68C3A9` → `var(--color-primary)`. `radial-gradient` hover eliminado, reemplazado por overlay sólido `bg-primary/[0.04]`. | Cumple regla de solo colores sólidos sin degradados.
| 2026-07-08 | 13 | technologies.ts | Descripción de Loop Engineering acortada: eliminado "con la mínima intervención humana". | —
| 2026-07-08 | 13 | Hero.tsx | Badge "Autodidacta · AI-First · Innovación" eliminado. "Hola, soy" → "Hola, soy Arturo Apaza Jiménez un". Saludo a `text-2xl text-white`. Tagline a `text-white`. | Personalización Hero. Textos introductorios en blanco.
| 2026-07-09 | 14 | AIStack.tsx (nuevo), Sidebar.tsx, SectionDots.tsx, page.tsx, Hero.tsx | Nueva sección "AI Stack" en posición 3. 5 categorías en grid responsivo: LLMs, Frameworks, Tools, Infra, Automation. Mismo glass pattern que project cards. Sidebar + SectionDots actualizados. Hero CTAs reindexados (3→4, 5→6). | Diseñada con recomendaciones UI/UX Pro Max (Bento Grid + Soft UI). Iconos Lucide: BrainCircuit, Layers, Wrench, Server, Zap.
| 2026-07-09 | 15 | technologies.ts, layout.tsx, globals.css, TerminalCard.tsx (nuevo), Technologies.tsx | **Engineering Principles rediseñado como terminal**: cada metodología se muestra en una ventana de terminal minimalista (fondo oscuro, JetBrains Mono, label "bash" en barra de título). Animación de tipeo carácter por carácter del comando `$`, luego líneas de salida una por una con fade-in, cursor parpadeante al final. Interfaz `TerminalLine` (type: command/output/success/highlight). Descripciones muy breves en español debajo de cada terminal. | Animación con `useReducer` (evita lint rule set-state-in-effect). Soporta `prefers-reduced-motion`. Solo se ejecuta una vez al entrar al viewport. JetBrains Mono via `next/font/google` como `--font-mono`. Hover con glow primary. |
| 2026-07-10 | 16 | Philosophy.tsx, aistack.ts (nuevo), DOCUMENTACION.md | **Filosofía rediseñada como red neuronal interactiva** (branch `filosofia`). 6 nodos (Engineering DNA + 5 principios), 15 conexiones bezier-curve, 50 dots de fondo deterministas. Click en nodo abre panel con descripción. | Posiciones calculadas desde porcentajes via `useContainerSize` + `useSyncExternalStore`. Pulse animation con `strokeDasharray` + `strokeDashoffset` infinito. Conexiones coloreadas por tipo (solid/process). |
| 2026-07-10 | 16 | aistack.ts (nuevo), AIStack.tsx (reescrito), Sidebar.tsx, SectionDots.tsx, page.tsx, Hero.tsx | **AI Stack rediseñado como grafo arquitectónico**: 5 capas verticales (Applications, Agent Framework, Models, Infrastructure, Data), 14 nodos con íconos, conectados por línea central. | `aistack.ts` exporta 5 capas, 14 nodos, descripciones one-line. Layout vertical con `flex-col` y línea SVG conectora central. Sección movida a posición 3 (después de Engineering Principles). |
| 2026-07-10 | 16 | Philosophy.tsx | **Ajuste visibilidad conexiones**: `strokeWidth 0.8→1.2`, `strokeOpacity 0.12→0.30` (normal); `1.8→2.5`, `0.55→0.75` (active); `0.03→0.08` (dimmed). Dash `"3 24"→"4 16"`. | Conexiones más visibles en estado base, pulso más notorio al hover. |
| 2026-07-11 | 17 | Hero.tsx, About.tsx, AIStack.tsx, Technologies.tsx, Projects.tsx, Contact.tsx, AnimatedSection.tsx, Badge.tsx, TerminalCard.tsx, globals.css, Sidebar.tsx, GitHubIcon.tsx (nuevo), AGENTS.md, DOCUMENTACION.md | **Optimización post-Filosofía**: TerminalCard (setInterval→CSS animate-blink). AnimatedSection elimina 4 direcciones muertas. Badge secondary = primary fusionado. @keyframes float eliminado. GitHubIcon extraído a componente compartido. Sidebar: fallback safe. Hero: AnimatedSection simplificados. Doc: 7→6 secciones. | |
| 2026-07-11 | 18 | AIStack.tsx, aistack.ts | **AI Stack rediseñado premium**: layout de grafo vertical reemplazado por composición con nodo central "AI Ecosystem", 5 cards glassmorphism con iconos Lucide + tech chips con avatar inicial, SVG connection lines animadas, floating particles, badge "Always learning", metrics strip. Descripciones agregadas a cada capa en aistack.ts. Emojis reemplazados por Lucide icons. | Diseño inspirado en Vercel/Linear/OpenAI. `radial-gradient()` vía inline style para ambient lighting (sin usar clases Tailwind gradient). `Math.random` reemplazado por valores deterministas vía regla `react-hooks/purity` de Next.js 16. |
| 2026-07-14 | 19 | AIStack.tsx, DOCUMENTACION.md | **AI Stack Interactivo con Logos Oficiales**: Se rediseñó la sección de AI Stack eliminando el badge flotante "Always learning" y la barra de métricas inferior. Se reemplazó el nodo central "AI Ecosystem" y la grilla de 5 tarjetas por una fila interactiva de 5 botones circulares (categorías) y una sola tarjeta de detalles abajo. Cada chip de tecnología renderiza el logo oficial vectorial de la marca con su respectivo color (OpenAI, Anthropic, Gemini, Vercel, Supabase, Pinecone, Docker, Cloudflare, etc.). | Siguiendo las instrucciones de la imagen `meta-stack.png`. Animación de cambio de categoría con AnimatePresence de Framer Motion. Verificación de build y lint (0 errores, 0 warnings). |
| 2026-07-14 | 20 | AIStack.tsx, aistack.ts, DOCUMENTACION.md | **Ajustes post-diseño**: Claude Code reemplazado por VS Code. Descripciones traducidas al español y luego eliminadas. Contraste de textos mejorado (zinc-500→zinc-400/zinc-300). Minimax agregado/eliminado en Models. OpenCode agregado/eliminado en Development Tools. Interfaz StackNode duplicada eliminada de aistack.ts. | Feedback directo del usuario. VS Code con logo azul #007ACC. |
| 2026-07-14 | 21 | AIStack.tsx, aistack.ts, DOCUMENTACION.md | **Reorganización categorías**: Automation renombrada a Deploy (Rocket icon). Docker movido de Tools → Deploy. Docker reemplazado por Warp en Tools. n8n reemplazado por Vercel + Railway en Deploy. Descripción de Models actualizada. Minimax re-agregado sin icono. Warp y Railway sin icono (pendientes). Big Pickle agregado y eliminado. | Categoría Deploy con descripción "Despliegue de los proyectos". Warp #01A4FF, Vercel #FFFFFF, Railway #7B3FE4 (logos removidos temporalmente). |
| 2026-07-14 | 21 | Sidebar.tsx | Brand text "AI" → "Arturo Apaza" (no clickeable) en desktop y mobile drawer | |
| 2026-07-14 | 22 | package.json, playwright.config.ts (nuevo), tests/home.spec.ts, tests/navigation.spec.ts, tests/ai-stack.spec.ts, tests/projects.spec.ts, tests/mobile.spec.ts, DOCUMENTACION.md | **Tests E2E con Playwright**: 44 tests, 4 skipped, 0 fallos. Cobertura completa: renderizado, navegación (sidebar, keyboard, dots, drawer), AI Stack interactivo, modales de proyectos, mobile drawer. | Proyecto chromium + Mobile Chrome. webServer automático con next dev. `test:e2e` script. `test.skip` condicional por proyecto para tests desktop-only/mobile-only. |
| 2026-07-16 | 23 | About.tsx, DOCUMENTACION.md | **Optimización Responsive en Sobre Mí**: Se colapsó el segundo párrafo de texto mediante un botón interactivo "Ver más..." en móviles. Para asegurar que quepan las 4 tarjetas de principios en la pantalla móvil, se redujo el tamaño de fuente (`text-xs` en descripción, `text-sm` en título), se achicó el padding/íconos, y se configuró para ocultar las tarjetas por completo mientras el párrafo largo esté expandido en móvil, restaurándolas al colapsar ("Ver menos"). | Implementado con estado de React `isExpanded` condicionado por media-query de CSS. Cuadrícula adaptada a grid-cols-1 sm:grid-cols-2 con animaciones suaves de colapso de altura y opacidad. |
| 2026-07-16 | 24 | AIStack.tsx, DOCUMENTACION.md | **Diseño Responsive AI Stack - Carrusel Móvil**: Se implementó un layout completamente responsivo para la sección AI Stack. Desktop (md+): mantiene los 5 botones circulares en grid. Mobile (<768px): carrusel con 1 botón visible centralizado, botones de navegación `< >` (ChevronLeft/ChevronRight), indicador de posición "X/5", animaciones slide direccionales (entrada/salida en lados opuestos según dirección del botón). La tarjeta de detalles es compacta en mobile (p-4 sm:p-6 md:p-8). Los chips son scrollables horizontalmente en mobile (overflow-x-auto, shrink-0). Se agregó viewport detection vía useEffect para diferenciar entre móvil/desktop. Se implementó `slideDirection` state para rastrear dirección de navegación. Animaciones con Framer Motion `AnimatePresence` y `custom` prop para capturar slideDirection en tiempo de render. | Responsive-first approach. Breakpoint md: 768px. `goToPrevious()` y `goToNext()` actualizan currentCategoryIndex y slideDirection. **Problema pendiente**: Después de múltiples interacciones, la dirección de entrada/salida puede desincronizarse. Requiere revisión de la lógica de animación con custom prop. Pospuesto para siguiente sesión. |
| 2026-07-16 | 25 | Contact.tsx, DOCUMENTACION.md | **Mejoras Sección Contacto**: Se rediseñó la sección de contacto aplicando optimizaciones responsivas. Removida la red X (socialLinks reducido a solo GitHub + LinkedIn). Botones sociales: reducidos a `w-14 h-14 sm:w-16 sm:h-16` con iconos aumentados a `w-7 h-7`. Layout del email rediseñado: cambio de `flex items-center` a `flex-col` (ícono posicionado arriba del texto). Ícono del email aumentado a `w-10 h-10 sm:w-12 sm:h-12`. Texto del email reducido a `text-2xl sm:text-3xl lg:text-4xl` para evitar cortarse en mobile. Gap entre botones aumentado a `gap-8` para mejor espaciado. | Feedback directo del usuario en mobile: X removido, botones proporcionados, email visible sin truncamiento, layout vertical más limpio. |
| 2026-07-16 | 26 | AIStack.tsx, tests/ai-stack.spec.ts, DOCUMENTACION.md | **Fix animación carrusel y tests**: Se reemplazó `slideDirection` (useState) por `slideDirectionRef` (useRef) para evitar stale closures en la animación de salida del carrusel móvil. Se corrigió `activeLayer` (useMemo) para que use `activeLayerId` en desktop en vez de `currentCategoryIndex`, resolviendo bug donde el contenido de la tarjeta de detalles no coincidía con el botón de categoría clickeado. Se adaptaron los tests E2E de AI Stack para funcionar en ambos viewports (desktop y Mobile Chrome) usando navegación por botón `< >` en móvil. | La prop `exit` de Framer Motion usa función vía `as any` para sortear tipos estrictos de framer-motion 12.42.2. Build: 0 errores. Tests: 42 pasan, 6 skip, 0 fallos. |
| 2026-07-16 | 27 | Technologies.tsx, TerminalCard.tsx, DOCUMENTACION.md | **Responsive Engineering Principles - Botones `.bat` en móvil**: En mobile (`<md`) se reemplazó la lista de terminales apiladas por 4 botones tipo comando con sufijo `.bat`. Al tocar un botón se oculta la lista y se muestra una sola terminal animada correspondiente al principio elegido. | Desktop (`md+`) conserva la grilla original de terminales. `TerminalCard` ahora acepta `startMode`, `onDone` y `showMeta`; `startMode="mount"` permite reiniciar la animación al abrir una terminal desde mobile. El botón "Cerrar terminal" aparece solo al finalizar la animación. No se ejecutaron tests por indicación del usuario. |
| 2026-07-16 | 27 | tests/engineering-principles.spec.ts (nuevo), DOCUMENTACION.md | **Tests E2E Engineering Principles**: 10 tests (6 corren, 4 skip según viewport). Desktop: verifica 4 terminal cards visibles. Mobile: verifica 4 botones `.bat`, que al clickear se abre la terminal con "Cerrar terminal", que cada botón abre su comando correcto, y que al cerrar vuelven los botones. | 48 tests totales en suite completa (42 preexistentes + 6 nuevos). 0 fallos. |
| 2026-07-16 | 27 | TerminalCard.tsx, DOCUMENTACION.md | **Contraste tagline**: `text-zinc-500` → `text-zinc-400` en el tagline bajo cada título de Engineering Principles para mejorar legibilidad sobre fondo `dark-bg`. | Consistente con ajuste de contraste de Fase 20 (AI Stack). |

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
| 8 | Fila interactiva de 5 botones y única tarjeta de detalles en AI Stack | Mantener grilla de 5 tarjetas fijas o grafo estático | Según la especificación visual en `meta-stack.png`. Optimiza la distribución del espacio del viewport, reduce la carga cognitiva mostrando una capa a la vez, y permite presentar chips enriquecidos con los logotipos oficiales de libre uso de cada marca en color original. |
| 9 | Playwright como framework E2E | Vitest + jsdom, Cypress | Next.js 16 con renderizado híbrido SSR+client necesita un navegador real para probar correctamente WheelSnapLayout (wheel/keyboard/touch events) y modales con createPortal. Playwright ofrece webServer automático, paralelización y reporte HTML integrado. `test.skip` condicional por proyecto (`test.info().project.name`) evita duplicar tests desktop vs mobile. |

---

## Problemas Conocidos

| # | Descripción | Estado | Solución |
|---|-------------|--------|----------|
| 1 | **Animación carrusel móvil AI Stack desincronizada** | ✅ Resuelto (Fase 26) | Causa raíz: `slideDirection` (useState) capturaba el valor anterior debido a que el componente que sale se renderiza con el estado viejo antes de que el nuevo estado esté disponible. Solución: reemplazar por `useRef` (`slideDirectionRef`), que siempre apunta al último valor renderizado. El componente entrante y saliente leen el mismo ref sincronizadamente. |
| 2 | **Tarjeta de detalles AI Stack muestra capa incorrecta en desktop** | ✅ Resuelto (Fase 26) | `activeLayer` (useMemo) usaba `currentCategoryIndex` (estado del carrusel móvil) en vez de `activeLayerId` (estado del click desktop) para buscar la capa activa. Solución: condicionar la búsqueda por `isMobile` — `activeLayerId` en desktop, `currentCategoryIndex` en móvil. |

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
│   │   ├── technologies.ts            ← Engineering Principles: 4 metodologías
│   │   ├── aistack.ts                 ← AI Stack: 5 capas, 14 nodos tecnológicos
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
│   │   │   ├── Badge.tsx              ← 2 variantes (default, primary)
│   │   │   ├── Input.tsx              ← forwardRef
│   │   │   └── Textarea.tsx           ← forwardRef
│   │   │   ├── TerminalCard.tsx        ← Terminal animada con tipeo (useReducer, JetBrains Mono)
│   │   │   └── GitHubIcon.tsx          ← SVG compartido GitHub
│   │   └── sections/
│   │       ├── Hero.tsx               ← Sección 0: intro + CTA
│   │       ├── About.tsx              ← Sección 1: sobre mí
│   │       ├── Technologies.tsx       ← Sección 2: Engineering Principles (desktop: 4 TerminalCards; mobile: botones .bat + terminal animada)
│   │       ├── AIStack.tsx            ← Sección 3: AI Stack (grafo 5 capas, 14 nodos)
│   │       ├── Projects.tsx           ← Sección 4: 2 proyectos con modal expandible (createPortal)
│   │       └── Contact.tsx            ← Sección 5: email grande + redes, sin formulario
│   ├── public/                        ← Assets estáticos
├── tests/                         ← Tests E2E (Playwright)
│   ├── home.spec.ts               ← Renderizado, sidebar, dots, theme toggle
│   ├── navigation.spec.ts         ← Sidebar links, keyboard, dots, drawer
│   ├── ai-stack.spec.ts           ← Categorías interactivas, tecnologías
│   ├── projects.spec.ts           ← Modal open/close, keyboard lock
│   └── mobile.spec.ts             ← Drawer mobile, hamburger menu
├── playwright.config.ts           ← Config E2E (chromium + Mobile Chrome)
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
- **Tipografía**: Archivo para headings (`--font-heading`), Space Grotesk para body (`--font-body`), JetBrains Mono para terminal (`--font-mono`). Definidas via `next/font/google` con variables CSS. `font-heading` como clase Tailwind para títulos fuera de `h1-h6`. Solo la terminal de Engineering Principles usa `font-mono`.
