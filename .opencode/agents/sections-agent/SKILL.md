# Sections Agent Skill

Construye los componentes compartidos de sección y las 7 secciones del portafolio.

## AnimatedSection (`src/components/shared/AnimatedSection.tsx`)

- `"use client"`.
- Usa `useInView` de framer-motion con `once: true, margin: "-100px"`.
- Props: `children`, `className`, `delay` (default 0), `direction` ("up"|"down"|"left"|"right"|"none").
- Dirección determina el offset inicial (y:±60, x:±60).
- Transición: `duration: 0.7, ease: [0.21, 0.45, 0.32, 0.98]`.

## SectionHeading (`src/components/shared/SectionHeading.tsx`)

- Componente servidor (no necesita `"use client"`).
- Props: `title` (string), `subtitle?`, `className?`, `align?` ("center"|"left").
- Título: `text-3xl sm:text-4xl font-bold`. Subtítulo: `text-lg text-zinc-600 dark:text-zinc-400`.

## Hero (`src/components/sections/Hero.tsx`)

- `"use client"` (usa useWheelSnap + motion).
- Fondo: gradiente radial azul, blur circles, SVG grid pattern.
- Badge flotante con "Autodidacta · AI-First · Innovación".
- Título con gradiente azul-violeta en `bg-clip-text`.
- Dos CTAs: "Ver proyectos" (scrollTo index 3) y "Contactarme" (scrollTo index 6).
- Indicador Scroll animado al fondo.

## About (`src/components/sections/About.tsx`)

- `"use client"`.
- Grid 2 columnas en lg (texto | highlights grid 2x2).
- Texto personal con palabras clave coloreadas (azul, violeta).
- 4 highlights: Aprendizaje Continuo, Resolución de Problemas, Automatización, IA Aplicada.
- Cada highlight: ícono lucide + título + descripción, hover con sombra y borde azul.

## Technologies (`src/components/sections/Technologies.tsx`)

- `"use client"`.
- Grid responsivo: `grid-cols-2 sm:3 md:4 lg:4`.
- Toma datos de `@/data/technologies`.
- Cada card: ícono (texto), nombre, categoría. Hover: scale + sombra + gradiente radial en fondo.
- Color de ícono con opacidad 15% como background.

## Projects (`src/components/sections/Projects.tsx`)

- `"use client"`.
- Grid: `sm:grid-cols-2 lg:grid-cols-3`.
- Toma datos de `@/data/projects`.
- Cada card: emoji + ícono de fondo, título, descripción (line-clamp-2), badges de tecnologías (máx 3 + "+N").
- Modal con `AnimatePresence` al hacer click: overlay con backdrop-blur, card expandida con `layoutId`, longDescription, todas las tecnologías, botones GitHub + Demo.
- Cada proyecto tiene colores de fondo e ícono definidos en `projectIcons` y `projectEmojis`.

## Experience (`src/components/sections/Experience.tsx`)

- `"use client"`.
- Timeline vertical con línea gradiente azul-violeta.
- Toma datos de `@/data/experience`.
- Cada item: punto indicador en la línea, año, ícono, título, descripción.

## Philosophy (`src/components/sections/Philosophy.tsx`)

- `"use client"`.
- Fondo: gradiente radial violeta.
- Cita destacada en card azul con borde.
- Grid 2 columnas con 4 principios: IA como núcleo, Velocidad sin sacrificio, Precisión técnica, Responsabilidad.
- Cada principio: ícono lucide violeta, título, descripción.

## Contact (`src/components/sections/Contact.tsx`)

- `"use client"`.
- Grid 2 columnas en lg.
- Izquierda: texto, social links (GitHub, LinkedIn, X, Email), info de contacto (email, ubicación).
- Derecha: formulario con Input (nombre, email) + Textarea (mensaje) + Button submit.
- Estado `sent` simulado (3s). Íconos: Send / Check.
- Footer con copyright año actual dinámico.
- Iconos SVG inline para GitHub, LinkedIn, X.
