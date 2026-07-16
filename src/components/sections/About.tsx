"use client"

import { useState } from "react"
import { Lightbulb, Code2, Rocket, Brain } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { cn } from "@/lib/utils"

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
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedHighlight, setExpandedHighlight] = useState<number | null>(null)

  const handleHighlightClick = (index: number) => {
    // Solo activar comportamiento acordeón en pantallas móviles (< 640px)
    if (typeof window !== "undefined" && window.innerWidth >= 640) {
      return
    }
    setExpandedHighlight(expandedHighlight === index ? null : index)
  }

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-4 py-12 sm:py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection>
          <SectionHeading
            title="Sobre Mí"
            subtitle="Conoce mi enfoque y valores"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-10 sm:mt-12 lg:mt-16 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <AnimatedSection delay={0.1}>
            <div className="border-l-2 border-l-primary/30 pl-6">
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                Soy un desarrollador por el enfoque <span className="text-primary font-semibold">AI-First</span>.
                Mi viaje comenzó con la meta de mejorar la calidad y eficacia de mi trabajo
                evolucionado hacia la creación de soluciones inteligentes que marcan la diferencia.
              </p>
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out overflow-hidden sm:max-h-96 sm:opacity-100 sm:mt-4",
                  isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 pointer-events-none sm:pointer-events-auto"
                )}
              >
                <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Creo firmemente que la inteligencia artificial es una herramienta clave para el futuro.
                  La integro en cada proyecto buscando agilizar el desarrollo de mis ideas para
                  experiencias más eficientes y personalizadas, sin sacrificar la calidad
                  ni la atención al detalle.
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-sm font-semibold text-primary hover:text-hover transition-colors sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded cursor-pointer"
              >
                {isExpanded ? "Ver menos" : "Ver más..."}
              </button>
            </div>
          </AnimatedSection>

          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300 ease-in-out",
              isExpanded
                ? "max-h-0 opacity-0 pointer-events-none overflow-hidden mt-0 sm:max-h-none sm:opacity-100 sm:pointer-events-auto sm:overflow-visible"
                : "max-h-[600px] opacity-100 sm:max-h-none sm:opacity-100 sm:pointer-events-auto sm:overflow-visible"
            )}
          >
            {highlights.map((item, index) => {
              const isExpandedCard = expandedHighlight === index
              return (
                <AnimatedSection key={item.title} delay={0.1 * (index + 2)}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleHighlightClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleHighlightClick(index)
                      }
                    }}
                    className={cn(
                      "group relative rounded-2xl border bg-white dark:bg-zinc-800/30 p-3.5 transition-all duration-350 select-none",
                      // Estilos interactivos móviles (< sm)
                      "cursor-pointer sm:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 border-zinc-200 dark:border-zinc-700/50",
                      isExpandedCard
                        ? "border-primary/30 shadow-md shadow-primary/5 lg:border-zinc-200 lg:dark:border-zinc-700/50 lg:shadow-none"
                        : "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
                      // Anulación estática para escritorio (>= lg)
                      "lg:p-5 lg:cursor-default lg:hover:border-primary/30 lg:hover:shadow-lg lg:hover:shadow-primary/5 lg:hover:-translate-y-0.5 lg:border-zinc-200 lg:dark:border-zinc-700/50 lg:shadow-none lg:-translate-y-0"
                    )}
                    aria-expanded={isExpandedCard}
                    aria-label={`${item.title}. Presiona para ver la descripción.`}
                  >
                    {/* Contenedor de Icono + Título: Horizontal en móvil, Vertical en escritorio */}
                    <div className="flex flex-row items-center gap-3 lg:flex-col lg:items-start lg:gap-0">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 text-primary transition-transform duration-300 shadow-[0_0_12px_-4px] shadow-primary/20 shrink-0 lg:mb-3",
                          isExpandedCard ? "max-sm:scale-110" : "group-hover:scale-110"
                        )}
                      >
                        <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                      <h3
                        className={cn(
                          "text-sm lg:text-base font-semibold font-heading transition-colors duration-300 lg:mb-1",
                          isExpandedCard
                            ? "max-sm:text-primary"
                            : "text-zinc-900 dark:text-zinc-100 group-hover:text-primary"
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>
                    {/* Descripción: colapsable en móvil, visible desde sm */}
                    <div
                      className={cn(
                        "transition-all duration-300 ease-in-out overflow-hidden sm:max-h-none sm:opacity-100 sm:mt-0",
                        isExpandedCard ? "max-sm:max-h-24 max-sm:opacity-100 max-sm:mt-2.5" : "max-sm:max-h-0 max-sm:opacity-0"
                      )}
                    >
                      <p className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
