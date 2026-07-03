export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl: string
  demoUrl: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: "ai-code-assistant",
    title: "Asistente de Código con IA",
    description: "Asistente inteligente que autocompleta y genera código usando modelos de lenguaje avanzados.",
    longDescription:
      "Plataforma que integra OpenAI API y LangChain para ofrecer sugerencias de código en tiempo real, detección de bugs y refactorización automática. Conectada a Supabase para persistencia de historial y configuraciones de usuario.",
    image: "/projects/ai-code-assistant.jpg",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "LangChain", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    featured: true,
  },
  {
    id: "saas-automation",
    title: "Plataforma de Automatización SaaS",
    description: "Sistema de automatización de flujos de trabajo empresariales con IA y microservicios.",
    longDescription:
      "Backend en Python con FastAPI y PostgreSQL que orquesta tareas automatizadas mediante agentes de IA. Panel de control en React con visualización en tiempo real del estado de cada automatización.",
    image: "/projects/saas-automation.jpg",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "OpenAI API"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    featured: true,
  },
  {
    id: "ai-chat-platform",
    title: "Plataforma de Chat con IA",
    description: "Chat interactivo con respuestas contextuales usando streaming y modelos de lenguaje.",
    longDescription:
      "Aplicación de chat en tiempo real que utiliza Vercel AI SDK para streaming de respuestas y LangChain para encadenar prompts complejos. Historial de conversaciones persistido en Supabase con búsqueda semántica.",
    image: "/projects/ai-chat-platform.jpg",
    technologies: ["Next.js", "TypeScript", "Vercel AI SDK", "Supabase", "LangChain", "Tailwind CSS"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    featured: true,
  },
  {
    id: "data-analytics",
    title: "Panel de Análisis de Datos",
    description: "Dashboard interactivo para visualizar y analizar grandes volúmenes de datos empresariales.",
    longDescription:
      "Backend en FastAPI con PostgreSQL que procesa consultas analíticas agregadas. Frontend en React con TypeScript y gráficos dinámicos para exploración visual de tendencias y métricas clave.",
    image: "/projects/data-analytics.jpg",
    technologies: ["Python", "React", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    featured: false,
  },
  {
    id: "ai-content-generator",
    title: "Generador de Contenido con IA",
    description: "Herramienta que crea contenido escrito automatizado usando modelos de lenguaje.",
    longDescription:
      "Generador de artículos, descripciones y copywriting impulsado por OpenAI API y LangChain. Los usuarios configuran tono, audiencia y formato; el contenido se guarda y versiona en Supabase.",
    image: "/projects/ai-content-generator.jpg",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "LangChain", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    featured: false,
  },
]
