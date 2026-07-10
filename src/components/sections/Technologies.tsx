"use client"

import { methodologies } from "@/data/technologies"
import { TerminalCard } from "@/components/ui/TerminalCard"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function Methodologies() {
  return (
    <section
      id="technologies"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <SectionHeading
            title="Engineering Principles"
            subtitle="Metodologías que aplico para construir sistemas confiables y escalables."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {methodologies.map((method, index) => (
            <AnimatedSection key={method.name} direction="up" delay={0.15 * index}>
              <TerminalCard methodology={method} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
