export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl: string
  presentacionUrl: string
  introduccionUrl: string
  manualUrl: string
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
    presentacionUrl: "https://example.com/ai-code-assistant/presentacion",
    introduccionUrl: "https://example.com/ai-code-assistant/introduccion",
    manualUrl: "https://example.com/ai-code-assistant/manual",
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
    presentacionUrl: "https://example.com/saas-automation/presentacion",
    introduccionUrl: "https://example.com/saas-automation/introduccion",
    manualUrl: "https://example.com/saas-automation/manual",
    featured: true,
  },
]
