export interface ProjectFeature {
  icon: string
  title: string
  description: string
}

export interface ProjectChallenge {
  problem: string
  solution: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl: string
  presentacionUrl: string
  introduccionUrl: string
  manualUrl: string
  featured: boolean
  features: ProjectFeature[]
  architecture: string
  challenges: ProjectChallenge[]
}

export const projects: Project[] = [
  {
    id: "ai-code-assistant",
    title: "Asistente de Código con IA",
    tagline: "Autocompletado inteligente y generación de código con modelos de lenguaje",
    description: "Asistente inteligente que autocompleta y genera código usando modelos de lenguaje avanzados.",
    longDescription:
      "Plataforma que integra OpenAI API y LangChain para ofrecer sugerencias de código en tiempo real, detección de bugs y refactorización automática. Conectada a Supabase para persistencia de historial y configuraciones de usuario.",
    image: "/projects/ai-code-assistant.png",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "LangChain", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com",
    presentacionUrl: "https://example.com/ai-code-assistant/presentacion",
    introduccionUrl: "https://example.com/ai-code-assistant/introduccion",
    manualUrl: "https://example.com/ai-code-assistant/manual",
    featured: true,
    features: [
      { icon: "⚡", title: "Autocompletado en tiempo real", description: "Sugerencias contextuales mientras escribes, con detección del lenguaje y framework." },
      { icon: "🐛", title: "Detección de bugs", description: "Análisis estático del código para identificar errores potenciales antes de ejecutar." },
      { icon: "🔄", title: "Refactorización automática", description: "Propuestas de mejora de código con un solo clic, manteniendo la semántica original." },
      { icon: "📚", title: "Historial inteligente", description: "Todas las sugerencias y cambios se guardan para aprendizaje y contexto futuro." },
    ],
    architecture: "Frontend en Next.js con streaming de respuestas vía Server-Sent Events. El backend orquesta prompts multi-paso con LangChain, encadenando llamadas a OpenAI API. Supabase almacena sesiones, preferencias y el historial de sugerencias. La detección de bugs corre en un worker separado usando AST parsing.",
    challenges: [
      { problem: "Latencia en respuestas de IA en tiempo real", solution: "Implementamos streaming con SSE y caché predictiva de snippets comunes, reduciendo la latencia percibida un 60%." },
      { problem: "Precisión en contextos de código muy grandes", solution: "Dividimos el contexto en chunks semánticos y usamos un modelo de embeddings para recuperar solo las partes relevantes." },
    ],
  },
  {
    id: "saas-automation",
    title: "Plataforma de Automatización SaaS",
    tagline: "Orquestación inteligente de flujos de trabajo empresariales",
    description: "Sistema de automatización de flujos de trabajo empresariales con IA y microservicios.",
    longDescription:
      "Backend en Python con FastAPI y PostgreSQL que orquesta tareas automatizadas mediante agentes de IA. Panel de control en React con visualización en tiempo real del estado de cada automatización.",
    image: "/projects/saas-automation.png",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "OpenAI API"],
    githubUrl: "https://github.com",
    presentacionUrl: "https://example.com/saas-automation/presentacion",
    introduccionUrl: "https://example.com/saas-automation/introduccion",
    manualUrl: "https://example.com/saas-automation/manual",
    featured: true,
    features: [
      { icon: "🔧", title: "Workflow visual", description: "Editor drag & drop para crear flujos de automatización sin escribir código." },
      { icon: "🤖", title: "Agentes inteligentes", description: "Cada tarea es ejecutada por un agente de IA especializado con contexto compartido." },
      { icon: "📊", title: "Panel en tiempo real", description: "Visualización del estado, logs y métricas de cada automatización en vivo." },
      { icon: "🔌", title: "Integraciones modulares", description: "Conectores preconstruidos para CRM, email, Slack y APIs externas." },
    ],
    architecture: "Backend de microservicios en Python con FastAPI, cada agente de IA corre como un servicio independiente orquestado por una cola de mensajes (Redis). PostgreSQL almacena configuraciones y registros. El frontend en React se conecta vía WebSocket para actualizaciones en tiempo real. Todo containerizado con Docker.",
    challenges: [
      { problem: "Coordinación entre múltiples agentes de IA", solution: "Implementamos un orquestador central con cola de mensajes que gestiona dependencias y estados, garantizando ejecución secuencial o paralela según el workflow." },
      { problem: "Escalabilidad bajo picos de carga", solution: "Arquitectura de microservicios con auto-scaling horizontal y balanceo de carga, desplegada en Kubernetes." },
    ],
  },
]
