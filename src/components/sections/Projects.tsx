"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { projects, type Project } from "@/data/projects"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { useWheelSnap } from "@/components/shared/WheelSnapLayout"

const projectMeta: Record<string, { emoji: string }> = {
  "ai-code-assistant": { emoji: "🤖" },
  "saas-automation": { emoji: "⚙️" },
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const meta = projectMeta[project.id] || { emoji: "📁" }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        layoutId={`project-card-${project.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-2 rounded-xl bg-zinc-900/70 text-zinc-300 hover:text-white hover:bg-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

          <div className="p-8 md:p-12 space-y-12">
            <div className="grid md:grid-cols-[3fr_2fr] gap-8 md:gap-12">
              <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-4xl mb-2 block">{meta.emoji}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                    {project.title}
                  </h2>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.longDescription}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {project.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/30 hover:border-primary/30 hover:shadow-sm hover:shadow-primary/5 transition-all duration-300"
                    >
                      <span className="text-xl block mb-1">{feature.icon}</span>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-0.5">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/70 mb-4">
                Arquitectura
              </h3>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 border-l-2 border-l-primary/30 bg-zinc-50 dark:bg-zinc-800/40 p-6">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/70 mb-6">
                Desafíos y Soluciones
              </h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/40 p-5 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-red-500 mt-0.5 shrink-0">⚠️</span>
                      <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                        {challenge.problem}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {challenge.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700/50 border-t-primary/10">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="primary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <GitHubIcon className="w-4 h-4" />
                  GitHub
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.open(project.presentacionUrl, "_blank")}
                >
                  Presentación
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.open(project.introduccionUrl, "_blank")}
                >
                  Introducción
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.open(project.manualUrl, "_blank")}
                >
                  Manual
                </Button>
              </div>
            </section>
          </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { setLocked } = useWheelSnap()

  const closeModal = () => {
    setSelectedProject(null)
    setLocked(false)
  }

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <SectionHeading
            title="Proyectos"
            subtitle="Algunos trabajos que he realizado"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const meta = projectMeta[project.id] || { emoji: "📁" }
            const visibleTechs = project.technologies.slice(0, 3)
            const remaining = project.technologies.length - 3

            return (
              <AnimatedSection key={project.id} direction="up" delay={0.1 * index}>
                <motion.div
                  layoutId={`project-card-${project.id}`}
                  onClick={() => { setSelectedProject(project); setLocked(true) }}
                  className="group relative rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-6 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{meta.emoji}</span>
                      <span className="text-4xl opacity-[0.04] dark:opacity-[0.08] select-none">
                        {meta.emoji}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {visibleTechs.map((tech) => (
                        <Badge key={tech} variant="default">
                          {tech}
                        </Badge>
                      ))}
                      {remaining > 0 && (
                        <Badge variant="default">+{remaining}</Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={closeModal}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}
