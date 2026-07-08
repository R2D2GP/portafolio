"use client"

import { useWheelSnap } from "./WheelSnapLayout"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const sections = [
  { label: "Inicio" },
  { label: "Sobre mí" },
  { label: "Engineering Principles" },
  { label: "Proyectos" },
  { label: "Filosofía" },
  { label: "Contacto" },
]

export function SectionDots() {
  const { currentIndex, scrollToSection } = useWheelSnap()

  return (
    <nav
      className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
      aria-label="Navegación por secciones"
    >
      {sections.map((section, index) => {
        const isActive = index === currentIndex
        return (
          <button
            key={section.label}
            onClick={() => scrollToSection(index)}
            className="group relative flex items-center justify-center py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full"
            aria-label={section.label}
            aria-current={isActive ? "true" : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="dot-active"
                className="absolute inset-0 flex items-center justify-center"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              >
                <span className="h-2 w-2 rounded-full bg-primary" />
              </motion.span>
            )}
            <span
              className={cn(
                "rounded-full transition-all duration-300",
                isActive
                  ? "h-2.5 w-2.5 bg-primary ring-2 ring-primary/20"
                  : "h-1.5 w-1.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500 group-hover:scale-125"
              )}
            />
            <span className="absolute right-5 px-2 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-[11px] text-white dark:text-zinc-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg pointer-events-none">
              {section.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
