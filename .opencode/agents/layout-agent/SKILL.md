# Layout Agent Skill

Construye los componentes de layout del portafolio.

## WheelSnapLayout (`src/components/shared/WheelSnapLayout.tsx`)

- Único provider de contexto `{ currentIndex, scrollToSection }`.
- Envuelve sidebar + `<main>` con secciones.
- **Sin scroll nativo**: body `overflow: hidden`, todo el desplazamiento es por transform.
- Detecta eventos wheel/touch/keyboard → `translateY(-offsetTop)`.
- Usa `useRef` para `isScrolling` (debounce de 700ms) y `currentIndexRef` para evitar closures obsoletos.
- `prefers-reduced-motion`: detecta con `matchMedia`, si está activo usa `duration-0` en vez de `transition-transform duration-700 ease-in-out`.
- Renderiza `SectionDots` dentro del provider.
- Exporta `useWheelSnap()` hook.

## Sidebar (`src/components/layout/Sidebar.tsx`)

- `"use client"`.
- Desktop: `<aside>` fijo a la izquierda (`w-16`), con íconos de lucide-react, indicador activo animado (`layoutId`), tooltips en hover, ThemeToggle al final.
- Mobile: botón hamburguesa, `MobileDrawer` con `AnimatePresence`, overlay, animación spring desde `x: -320`.
- Navegación: 7 links con `href` e íconos. Al hacer click, llama a `scrollToSection(index)` del contexto.
- `navLinks` array con los 7 items mapeados por índice (0-6).

## ThemeToggle (`src/components/shared/ThemeToggle.tsx`)

- Usa `useTheme` de `next-themes`. Alterna entre `"dark"` y `"light"`.
- Prevenir hydration mismatch con estado `mounted` — renderiza placeholder cuando no mounted.
- Animación con `AnimatePresence` + `motion.div` rotando.
- Íconos: `Sun` (yellow-400) / `Moon` (zinc-600).

## SectionDots (`src/components/shared/SectionDots.tsx`)

- Fijo a la derecha (`right-3 top-1/2`), z-50.
- 7 dots (uno por sección), el activo es más grande con `ring` azul.
- Indicador activo animado con `layoutId="dot-active"`.
- Tooltip en hover a la izquierda del dot.
- `aria-label` y `aria-current` en cada botón.

## globals.css (`src/app/globals.css`)

- `@import "tailwindcss"`.
- `@custom-variant dark (&:where(.dark, .dark *))`.
- Tema claro (variables en `:root`) y oscuro (variables en `.dark`).
- `body: overflow: hidden`.
- `::selection` con color azul.
- `@keyframes float` para animaciones sutiles.
- `@utility bg-gradient-radial`.
- `@media (prefers-reduced-motion: reduce)` desactiva animaciones y transiciones.
- Paleta: `--background`, `--foreground`, `--card`, `--card-hover`, `--border`, `--muted`, `--muted-foreground` para claro y oscuro.
