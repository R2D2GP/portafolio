# Flujo de Trabajo — Construcción del Portafolio

## Introducción

Este documento describe las 7 fases para construir el portafolio final (`portafolio-final/`) basado en el ejemplo de referencia (`portafolio-ejemplo/`). Cada fase debe completarse en orden y requiere tu **visto bueno** antes de continuar a la siguiente.

---

## Fase 1: Andamiaje

**Objetivo**: Inicializar el proyecto Next.js con todas las dependencias y configuraciones base.

**Pasos**:
1. Ejecutar `npx create-next-app@latest .` con TypeScript, ESLint, Tailwind CSS, Turbopack.
2. Instalar dependencias adicionales:
   - `framer-motion` — animaciones
   - `lucide-react` — iconos
   - `next-themes` — modo oscuro/claro
   - `class-variance-authority` — variantes de componentes
   - `clsx` + `tailwind-merge` — utilidad `cn()`
   - `@radix-ui/react-slot` — polymorphic Button
3. Configurar `tsconfig.json`:
   - Verificar path alias `@/* → ./src/*`
   - Verificar `"strict": true`
4. Configurar `next.config.ts` (Turbopack root al directorio padre si es necesario).
5. Configurar `eslint.config.mjs` con `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`.
6. Configurar `postcss.config.mjs` con `@tailwindcss/postcss`.
7. Verificar que `npm run dev` inicia sin errores.

**Checkpoint**: ❓ ¿Compila el servidor de desarrollo? ¿Está todo listo para comenzar?

---

## Fase 2: Layout

**Objetivo**: Construir el sistema de navegación principal (WheelSnapLayout, Sidebar, SectionDots, ThemeToggle) y los estilos globales.

**Pasos**:
1. Crear `src/app/globals.css` con:
   - `@import "tailwindcss"` + `@custom-variant dark`
   - Variables de tema claro y oscuro
   - `body: overflow: hidden`
   - `prefers-reduced-motion: reduce` media query
   - `@keyframes float` y `bg-gradient-radial`
2. Crear `src/lib/utils.ts` con función `cn()`.
3. Crear `src/components/ui/Button.tsx` (necesario para ThemeToggle).
4. Crear `src/components/shared/WheelSnapLayout.tsx`:
   - Contexto `WheelSnapContext` con `currentIndex` y `scrollToSection`.
   - Event listeners: wheel, touchstart/touchend, keydown.
   - Transform container con `translateY`.
   - Soporte `prefers-reduced-motion` (duration-0).
5. Crear `src/components/shared/SectionDots.tsx`:
   - 7 dots fijos a la derecha.
   - Indicador activo animado con `layoutId`.
6. Crear `src/components/shared/ThemeToggle.tsx`:
   - Alterna tema vía `next-themes`.
   - Animación con `AnimatePresence`.
   - Manejar hydration mismatch.
7. Crear `src/components/layout/Sidebar.tsx`:
   - Desktop: `<aside>` fijo izquierdo con íconos y tooltips.
   - Mobile: `MobileDrawer` con overlay y animación spring.
   - Consume `useWheelSnap()`.
8. Crear `src/app/providers.tsx` con `ThemeProvider` (defaultTheme="dark", enableSystem=false).
9. Crear `src/app/layout.tsx` raíz:
   - Fonts Geist + Geist Mono.
   - Providers → WheelSnapLayout → children.
   - Metadata completa (SEO, OpenGraph, Twitter).

**Checkpoint**: ❓ ¿Se ve la sidebar? ¿Los dots se iluminan al navegar? ¿Funciona el cambio de tema?

---

## Fase 3: UI Kit

**Objetivo**: Construir los componentes primitivos de UI.

**Pasos**:
1. Crear `src/components/ui/Badge.tsx` con variantes default, primary, secondary.
2. Crear `src/components/ui/Input.tsx` con forwardRef y estilos consistentes.
3. Crear `src/components/ui/Textarea.tsx` con forwardRef.

**Checkpoint**: ❓ ¿Los componentes UI se ven consistentes con el diseño?

---

## Fase 4: Datos

**Objetivo**: Crear los tipos y archivos de datos placeholder.

**Pasos**:
1. Crear `src/data/technologies.ts` — interfaz `Technology` + array de ~16 tecnologías.
2. Crear `src/data/projects.ts` — interfaz `Project` + array de 5 proyectos.
3. Crear `src/data/experience.ts` — interfaz `ExperienceItem` + array de 6 experiencias (2020-2025).

**Checkpoint**: ❓ ¿Los datos tienen la estructura correcta? ¿Hay al menos 5 proyectos y 16 tecnologías?

---

## Fase 5: Secciones

**Objetivo**: Construir los componentes compartidos de sección y las 7 secciones del portafolio.

**Pasos**:
1. Crear `src/components/shared/AnimatedSection.tsx` con `useInView` de framer-motion.
2. Crear `src/components/shared/SectionHeading.tsx`.
3. Crear las 7 secciones en orden:
   - `src/components/sections/Hero.tsx`
   - `src/components/sections/About.tsx`
   - `src/components/sections/Technologies.tsx`
   - `src/components/sections/Projects.tsx`
   - `src/components/sections/Experience.tsx`
   - `src/components/sections/Philosophy.tsx`
   - `src/components/sections/Contact.tsx`

**Checkpoint**: ❓ ¿Cada sección se ve bien? ¿Las animaciones de entrada funcionan? ¿El modal de proyectos abre y cierra?

---

## Fase 6: Integración

**Objetivo**: Conectar todo en la página principal y verificar que compile sin errores.

**Pasos**:
1. Crear `src/app/page.tsx` con las 7 secciones importadas.
2. Verificar integración completa (layout + sidebar + dots + todas las secciones).
3. Ejecutar `npm run build` — debe compilar sin errores.
4. Ejecutar `npm run lint` — sin errores.
5. Probar navegación completa: wheel scroll, click en sidebar, click en dots, teclado (flechas, PageUp/PageDown).

**Checkpoint**: ❓ ¿Compila sin errores? ¿Navegar entre todas las secciones funciona? ¿El lint pasa limpio?

---

## Fase 7: Revisión Final

**Objetivo**: Pulir detalles, verificar responsive, reduced motion, accesibilidad.

**Pasos**:
1. Probar en viewports mobile, tablet, desktop.
2. Verificar que el drawer mobile se abre/cierra correctamente.
3. Probar con `prefers-reduced-motion: reduce` — snap debe ser instantáneo.
4. Verificar tooltips en sidebar y section dots.
5. Confirmar que el modo oscuro es el predeterminado.
6. Actualizar `DOCUMENTACION.md` con el resumen final.

**Checkpoint**: ❓ ¿Todo funciona correctamente? ¿Listo para personalizar contenido?

---

## Resumen de Comandos

| Comando | Cuándo usarlo |
|---------|---------------|
| `npm run dev` | Desarrollo continuo |
| `npm run build` | Antes de cada checkpoint |
| `npm run lint` | Antes de cada checkpoint |
