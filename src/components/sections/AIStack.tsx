"use client"

import { Check, BrainCircuit, Layers, Wrench, Server, Zap } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

const categories = [
  {
    name: "LLMs",
    icon: BrainCircuit,
    items: ["GPT-5", "Claude", "Gemini"],
  },
  {
    name: "Frameworks",
    icon: Layers,
    items: ["LangGraph", "Vercel AI SDK", "OpenAI SDK"],
  },
  {
    name: "Tools",
    icon: Wrench,
    items: ["Cursor", "Claude Code", "Playwright", "Docker"],
  },
  {
    name: "Infra",
    icon: Server,
    items: ["Supabase", "Pinecone", "Cloudflare"],
  },
  {
    name: "Automation",
    icon: Zap,
    items: ["n8n", "GitHub Actions"],
  },
]

export function AIStack() {
  return (
    <section
      id="ai-stack"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <SectionHeading
            title="AI Stack"
            subtitle="Tecnologías y herramientas que integro en mi flujo de trabajo."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <AnimatedSection key={category.name} direction="up" delay={0.1 * index}>
              <div className="group rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/20 backdrop-blur-[2px] p-5 hover:border-primary/30 hover:shadow-lg hover:bg-white/70 dark:hover:bg-zinc-800/40 transition-all duration-300 h-full">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 font-heading">
                    {category.name}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
