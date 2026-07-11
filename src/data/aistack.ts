export interface StackNode {
  id: string
  label: string
  description: string
}

export interface StackLayer {
  id: string
  label: string
  description: string
  nodes: StackNode[]
}

export interface StackNode {
  id: string
  label: string
  description: string
}

export const stackLayers: StackLayer[] = [
  {
    id: "models",
    label: "Models",
    description: "Modelos de lenguaje de última generación",
    nodes: [
      { id: "gpt5", label: "GPT-5", description: "Primary reasoning model" },
      { id: "claude", label: "Claude", description: "Extended context & analysis" },
      { id: "gemini", label: "Gemini", description: "Multimodal processing" },
    ],
  },
  {
    id: "frameworks",
    label: "Agent Frameworks",
    description: "Orquestación de agentes inteligentes",
    nodes: [
      { id: "langgraph", label: "LangGraph", description: "Agent orchestration framework" },
      { id: "openai-sdk", label: "OpenAI SDK", description: "GPT integration layer" },
      { id: "vercel-ai-sdk", label: "Vercel AI SDK", description: "Edge AI deployment" },
    ],
  },
  {
    id: "tools",
    label: "Development Tools",
    description: "Herramientas de desarrollo AI-native",
    nodes: [
      { id: "cursor", label: "Cursor", description: "AI-native code editor" },
      { id: "claude-code", label: "Claude Code", description: "Terminal AI assistant" },
      { id: "playwright", label: "Playwright", description: "Browser automation" },
      { id: "docker", label: "Docker", description: "Containerized environments" },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure & Memory",
    description: "Infraestructura serverless y memoria vectorial",
    nodes: [
      { id: "supabase", label: "Supabase", description: "Backend as a service" },
      { id: "pinecone", label: "Pinecone", description: "Vector storage & search" },
      { id: "cloudflare", label: "Cloudflare", description: "Edge network & workers" },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    description: "Automatización de flujos de trabajo",
    nodes: [
      { id: "github-actions", label: "GitHub Actions", description: "CI/CD pipelines" },
      { id: "n8n", label: "n8n", description: "Workflow automation" },
    ],
  },
]
