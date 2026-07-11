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
import { GitHubIcon } from "@/components/ui/GitHubIcon"

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <motion.div
        layoutId={`project-card-${project.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200/80 dark:border-zinc-700/40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm shadow-2xl"
      >
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-2 rounded-xl bg-zinc-900/70 text-zinc-300 hover:text-white hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                  className="object-contain rounded-xl"
                />
              </div>

              <div className="space-y-6">
                <div>
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
        <AnimatedSection >
          <SectionHeading
            title="Proyectos"
            subtitle="Algunos trabajos que he realizado"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const visibleTechs = project.technologies.slice(0, 3)
            const remaining = project.technologies.length - 3

            return (
              <AnimatedSection key={project.id}  delay={0.1 * index}>
                <motion.div
                  layoutId={`project-card-${project.id}`}
                  onClick={() => { setSelectedProject(project); setLocked(true) }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedProject(project); setLocked(true) } }}
                  className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/20 backdrop-blur-[2px] p-6 cursor-pointer hover:shadow-lg hover:border-primary/30 hover:bg-white/70 dark:hover:bg-zinc-800/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
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
