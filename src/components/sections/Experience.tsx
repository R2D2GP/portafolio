"use client"

import { experience } from "@/data/experience"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <SectionHeading
            title="Experiencia"
            subtitle="Mi trayectoria en el desarrollo"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-violet-500" />

            <div className="space-y-12">
              {experience.map((item, index) => (
                <AnimatedSection key={item.year} direction="up" delay={0.1 * index}>
                  <div className="relative pl-16">
                    <div className="absolute left-[13px] top-1 w-[15px] h-[15px] rounded-full border-2 border-blue-500 bg-white dark:bg-zinc-900 z-10" />
                    <div className="text-sm font-bold text-blue-500 dark:text-blue-400 mb-1">
                      {item.year}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{item.icon}</span>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
