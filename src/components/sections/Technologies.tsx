"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { methodologies } from "@/data/technologies"
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
            title="Metodologías"
            subtitle="Los principios que guían mi forma de construir software"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {methodologies.map((method, index) => (
            <AnimatedSection key={method.name} direction="up" delay={0.15 * index}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative h-full rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-8 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${method.color}15, transparent)`,
                  }}
                />
                <div className="relative z-10">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5"
                    style={{ backgroundColor: `${method.color}20` }}
                  >
                    <span className="text-3xl">{method.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                    {method.name}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {method.description}
                  </p>
                  <ul className="space-y-2.5">
                    {method.principles.map((principle) => (
                      <li key={principle} className="flex items-start gap-2.5">
                        <Check
                          className="w-5 h-5 mt-0.5 shrink-0"
                          style={{ color: method.color }}
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          {principle}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
