"use client"

import { motion } from "framer-motion"
import { technologies } from "@/data/technologies"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function Technologies() {
  return (
    <section
      id="technologies"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <SectionHeading
            title="Tecnologías"
            subtitle="Herramientas con las que trabajo día a día"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <AnimatedSection key={tech.name} direction="up" delay={0.05 * index}>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-5 text-center cursor-default hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${tech.color}15, transparent)`,
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <span className="text-3xl">{tech.icon}</span>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                      {tech.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {tech.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
