"use client"

import { Brain, Cpu, Users, Layout } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

const principles = [
  {
    icon: Brain,
    title: "AI-Native Development",
    description: "La IA como punto de partida, no como añadido. Sistemas diseñados para integrar modelos de lenguaje y agentes desde su arquitectura base.",
  },
  {
    icon: Cpu,
    title: "Agentic Systems",
    description: "Sistemas autónomos que planifican, ejecutan y se adaptan. Agentes de IA que orquestan flujos complejos y colaboran para resolver problemas reales.",
  },
  {
    icon: Users,
    title: "Human-Centered Automation",
    description: "Automatización que potencia a las personas. Procesos inteligentes que eliminan lo repetitivo para enfocarse en crear, decidir y conectar.",
  },
  {
    icon: Layout,
    title: "Scalable Architecture",
    description: "Bases sólidas y escalables. Microservicios y patrones de diseño que crecen con el negocio sin perder rendimiento.",
  },
]

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <SectionHeading
            title="Filosofía"
            subtitle="Cómo abordo el desarrollo"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 max-w-3xl mx-auto">
          <AnimatedSection direction="up" delay={0.2}>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-6 mb-12">
              <blockquote className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 border-l-4 border-l-primary pl-6">
                Creo que el futuro del software pertenece a quienes diseñan sistemas
                capaces de colaborar con la inteligencia artificial. Mi trabajo consiste en
                convertir procesos complejos en experiencias simples, rápidas y eficientes
                mediante automatización, agentes inteligentes y una arquitectura sólida.
              </blockquote>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <AnimatedSection key={principle.title} direction="up" delay={0.1 * (index + 3)}>
                <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_12px_-4px] shadow-primary/20">
                    <principle.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {principle.description}
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
