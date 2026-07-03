# Data Agent Skill

Construye los tipos y archivos de datos del portafolio. Todo el contenido es placeholder — el usuario lo personalizará después.

## technologies.ts (`src/data/technologies.ts`)

- Exportar interfaz `Technology`: `{ name: string, category: string, icon: string, color: string }`.
- Exportar array `technologies: Technology[]` con ~16 tecnologías.
- Categorías: Lenguaje, Frontend, Framework, Backend, IA, Base de Datos, DevOps.
- `icon`: emoji representativo. `color`: hex del color corporativo de la tecnología.
- Incluir: Python, JavaScript, TypeScript, React, Next.js, Node.js, Tailwind CSS, FastAPI, OpenAI API, LangChain, Vercel AI SDK, Supabase, PostgreSQL, Docker, Git, GitHub.

## projects.ts (`src/data/projects.ts`)

- Exportar interfaz `Project`: `{ id, title, description, longDescription, image, technologies: string[], githubUrl, demoUrl, featured: boolean }`.
- Exportar array `projects: Project[]` con 5 proyectos.
- `id`: slug en inglés (e.g. "ai-code-assistant").
- `image`: path placeholder `/projects/*.jpg`.
- `technologies`: array de strings que coinciden con nombres en technologies.ts.
- 3 featured (true), 2 no featured.
- `githubUrl` y `demoUrl`: placeholders.

## experience.ts (`src/data/experience.ts`)

- Exportar interfaz `ExperienceItem`: `{ year: string, title: string, description: string, icon: string }`.
- Exportar array `experience: ExperienceItem[]` con ~6 items.
- Años: 2020 a 2025 (uno por año).
- `year`: string del año.
- `icon`: emoji representativo.
- Título y descripción cuentan progresión de aprendizaje autodidacta.
