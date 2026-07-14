export interface StackNode {
  id: string
  label: string
}

export interface StackLayer {
  id: string
  label: string
  description: string
  nodes: StackNode[]
}

export const stackLayers: StackLayer[] = [
  {
    id: "models",
    label: "Models",
    description: "Modelos de lenguaje en constante evolución",
    nodes: [
      { id: "gpt5", label: "GPT-5" },
      { id: "claude", label: "Claude" },
      { id: "gemini", label: "Gemini" },
      { id: "minimax", label: "Minimax" },
    ],
  },
  {
    id: "frameworks",
    label: "Agent Frameworks",
    description: "Orquestación de agentes inteligentes",
    nodes: [
      { id: "langgraph", label: "LangGraph" },
      { id: "openai-sdk", label: "OpenAI SDK" },
      { id: "vercel-ai-sdk", label: "Vercel AI SDK" },
    ],
  },
  {
    id: "tools",
    label: "Development Tools",
    description: "Herramientas de desarrollo AI-native",
    nodes: [
      { id: "cursor", label: "Cursor" },
      { id: "vscode", label: "Visual Studio Code" },
      { id: "playwright", label: "Playwright" },
      { id: "warp", label: "Warp" },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure & Memory",
    description: "Infraestructura serverless y memoria vectorial",
    nodes: [
      { id: "supabase", label: "Supabase" },
      { id: "pinecone", label: "Pinecone" },
      { id: "cloudflare", label: "Cloudflare" },
    ],
  },
  {
    id: "deploy",
    label: "Deploy",
    description: "Despliegue de los proyectos",
    nodes: [
      { id: "github-actions", label: "GitHub Actions" },
      { id: "docker", label: "Docker" },
      { id: "vercel", label: "Vercel" },
      { id: "railway", label: "Railway" },
    ],
  },
]
