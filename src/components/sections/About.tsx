"use client"

import { Lightbulb, Code2, Rocket, Brain } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

const highlights = [
  {
    icon: Lightbulb,
    title: "Aprendizaje Continuo",
    description: "Cada día es una oportunidad para aprender algo nuevo y aplicarlo.",
  },
  {
    icon: Code2,
    title: "Resolución de Problemas",
    description: "Disfruto descomponer desafíos complejos en soluciones simples.",
  },
  {
    icon: Rocket,
    title: "Automatización",
    description: "Optimizo procesos para que la tecnología haga el trabajo pesado.",
  },
  {
    icon: Brain,
    title: "IA Aplicada",
    description: "Integro inteligencia artificial para potenciar productos reales.",
  },
]

export function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <SectionHeading
            title="Sobre Mí"
            subtitle="Conoce mi enfoque y valores"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right" delay={0.1}>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                Soy un desarrollador <span className="text-blue-500 font-semibold">autodidacta</span> apasionado por la tecnología
                y el enfoque <span className="text-violet-500 font-semibold">AI-First</span>.
                Mi viaje comenzó con la curiosidad de entender cómo funcionan las cosas y
                ha evolucionado hacia la creación de soluciones inteligentes que marcan la diferencia.
              </p>
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mt-4">
                Creo firmemente que la inteligencia artificial no es el futuro, sino el presente.
                La integro en cada proyecto para ofrecer experiencias más inteligentes,
                eficientes y personalizadas.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <AnimatedSection key={item.title} direction="up" delay={0.1 * (index + 2)}>
                <div className="group relative rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-5 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
