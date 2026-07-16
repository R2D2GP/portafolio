"use client"

import { useCallback, useState } from "react"
import { methodologies } from "@/data/technologies"
import { TerminalCard } from "@/components/ui/TerminalCard"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function Methodologies() {
  const [activeMethodology, setActiveMethodology] = useState<number | null>(null)
  const [terminalDone, setTerminalDone] = useState(false)

  const handleOpenTerminal = (index: number) => {
    setActiveMethodology(index)
    setTerminalDone(false)
  }

  const handleCloseTerminal = () => {
    setActiveMethodology(null)
    setTerminalDone(false)
  }

  const handleTerminalDone = useCallback(() => {
    setTerminalDone(true)
  }, [])

  const selectedMethodology =
    activeMethodology === null ? null : methodologies[activeMethodology]

  return (
    <section
      id="technologies"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection >
          <SectionHeading
            title="Engineering Principles"
            subtitle="Metodologías que aplico para construir sistemas confiables y escalables."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-12 md:mt-16 md:hidden">
          {selectedMethodology ? (
            <AnimatedSection key={selectedMethodology.name}>
              <TerminalCard
                key={selectedMethodology.name}
                methodology={selectedMethodology}
                startMode="mount"
                onDone={handleTerminalDone}
                showMeta
              />
              {terminalDone && (
                <div className="mt-6 flex justify-center">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={handleCloseTerminal}
                    className="font-mono"
                  >
                    Cerrar terminal
                  </Button>
                </div>
              )}
            </AnimatedSection>
          ) : (
            <div className="space-y-3">
              {methodologies.map((method, index) => (
                <AnimatedSection key={method.name} delay={0.08 * index}>
                  <button
                    type="button"
                    onClick={() => handleOpenTerminal(index)}
                    className="group w-full rounded-xl border border-zinc-700/50 bg-zinc-900/90 px-4 py-4 text-left font-mono text-sm text-zinc-200 shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99]"
                  >
                    <span className="mr-2 text-primary select-none">$</span>
                    <span className="transition-colors duration-300 group-hover:text-primary">
                      {method.terminal.command}.bat
                    </span>
                  </button>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 hidden md:grid md:grid-cols-2 gap-8">
          {methodologies.map((method, index) => (
            <AnimatedSection key={method.name}  delay={0.15 * index}>
              <TerminalCard methodology={method} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
