"use client"

import { Cpu, Zap, Target, Shield } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

const principles = [
  {
    icon: Cpu,
    title: "IA como núcleo",
    description: "No como un añadido. La inteligencia artificial está en el centro de cada solución que construyo.",
  },
  {
    icon: Zap,
    title: "Velocidad sin sacrificio",
    description: "Rápido no significa mal hecho. Optimización y calidad van de la mano.",
  },
  {
    icon: Target,
    title: "Precisión técnica",
    description: "Cada línea de código tiene un propósito. La precisión elimina la deuda técnica.",
  },
  {
    icon: Shield,
    title: "Responsabilidad",
    description: "Construir con ética, transparencia y responsabilidad hacia los usuarios.",
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
            <div className="rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-6 mb-12">
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
                &ldquo;La tecnología no es el fin, sino el medio. El verdadero valor está en cómo
                la usamos para resolver problemas reales y mejorar vidas. Cada proyecto es
                una oportunidad para crear algo que importe.&rdquo;
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <AnimatedSection key={principle.title} direction="up" delay={0.1 * (index + 3)}>
                <div className="group rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
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
