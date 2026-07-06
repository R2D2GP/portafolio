"use client"

import { Sparkles } from "lucide-react"
import { useWheelSnap } from "@/components/shared/WheelSnapLayout"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

export function Hero() {
  const { scrollToSection } = useWheelSnap()

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow/20 rounded-full blur-[128px]" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <AnimatedSection direction="up">
          <Badge variant="primary" className="inline-flex items-center gap-1.5 mb-8 px-4 py-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Autodidacta · AI-First · Innovación
          </Badge>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">Hola, soy</p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-primary">
              AI-First Developer
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
            Construyo aplicaciones modernas utilizando Inteligencia Artificial como núcleo del desarrollo.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => scrollToSection(3)}>
              Ver proyectos
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollToSection(5)}>
              Contactarme
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
