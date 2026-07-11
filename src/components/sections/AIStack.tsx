"use client"

import { useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import {
  BrainCircuit,
  Network,
  Wrench,
  Server,
  Zap,
  Sparkles,
  Cpu,
  CheckCircle2,
} from "lucide-react"
import { stackLayers } from "@/data/aistack"
import type { StackNode } from "@/data/aistack"

const layerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  models: BrainCircuit,
  frameworks: Network,
  tools: Wrench,
  infra: Server,
  automation: Zap,
}

const metrics = [
  { label: "+10 Technologies", icon: Cpu },
  { label: "AI-First Development", icon: BrainCircuit },
  { label: "Production Ready", icon: CheckCircle2 },
  { label: "Automation", icon: Zap },
  { label: "Agentic Systems", icon: Network },
]

const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 8 + ((i * 13 + 7) % 84),
  y: 10 + ((i * 23 + 11) % 75),
  size: 1.5 + ((i * 3 + 5) % 4) * 0.5,
  duration: 3 + ((i * 7 + 3) % 4),
  floatAmount: -(4 + ((i * 5 + 2) % 3)),
  animDelay: ((i * 11 + 13) % 20) * 0.1,
}))

function TechChip({ node }: { node: StackNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/30 border border-zinc-700/20 text-xs text-zinc-400 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 cursor-default select-none">
      <span className="w-4 h-4 rounded flex items-center justify-center bg-zinc-700/50 text-[9px] font-bold text-zinc-500 shrink-0">
        {node.label[0]}
      </span>
      {node.label}
    </span>
  )
}

export function AIStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const lines = useMemo(
    () => [
      { id: "l1", x2pct: 0.08 },
      { id: "l2", x2pct: 0.26 },
      { id: "l3", x2pct: 0.5 },
      { id: "l4", x2pct: 0.74 },
      { id: "l5", x2pct: 0.92 },
    ],
    [],
  )

  return (
    <section
      ref={sectionRef}
      id="ai-stack"
      className="min-h-screen flex flex-col justify-center px-4 py-24 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 30% 20%, rgba(104,195,169,0.05), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(104,195,169,0.03), transparent 50%)",
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20 pointer-events-none"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.5, 0],
                  y: [0, p.floatAmount, 0],
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.animDelay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Custom Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">
            AI Stack
          </h2>
          <div className="w-24 h-0.5 bg-primary mt-4 mx-auto rounded-full" />
          <p className="mt-4 text-zinc-400 text-lg">
            Building production-ready AI systems
          </p>
        </motion.div>

        {/* Central Ecosystem Node */}
        <motion.div
          className="flex justify-center mb-14"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <motion.div
            className="relative"
            animate={
              isInView
                ? { scale: [1, 1.04, 1] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_-8px] shadow-primary/30">
              <BrainCircuit className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10" />
            <p className="text-center text-sm text-zinc-500 mt-3 font-medium">
              AI Ecosystem
            </p>
          </motion.div>
        </motion.div>

        {/* SVG Decorative Lines + Cards */}
        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: "visible" }}
          >
            {lines.map((line, i) => (
              <motion.line
                key={line.id}
                x1="50%"
                y1="0"
                x2={`${line.x2pct * 100}%`}
                y2="100%"
                stroke="#68C3A9"
                strokeWidth={0.4}
                strokeOpacity={0.12}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 1.8,
                  delay: 0.4 + i * 0.12,
                  ease: "easeInOut",
                }}
              />
            ))}
            {lines.map((line, i) => (
              <motion.line
                key={`glow-${line.id}`}
                x1="50%"
                y1="0"
                x2={`${line.x2pct * 100}%`}
                y2="100%"
                stroke="#68C3A9"
                strokeWidth={1.2}
                strokeOpacity={0}
                initial={{ pathLength: 0 }}
                animate={
                  isInView
                    ? {
                        pathLength: 1,
                        strokeOpacity: [0, 0.1, 0],
                      }
                    : {}
                }
                transition={{
                  pathLength: {
                    duration: 1.8,
                    delay: 0.4 + i * 0.12,
                    ease: "easeInOut",
                  },
                  strokeOpacity: {
                    repeat: Infinity,
                    duration: 3 + i * 0.3,
                    delay: 3 + i * 0.5,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}
          </svg>

          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            {stackLayers.map((layer, i) => {
              const Icon = layerIcons[layer.id]
              return (
                <motion.div
                  key={layer.id}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div className="h-full rounded-2xl border border-zinc-700/40 bg-zinc-900/60 backdrop-blur-sm p-5 shadow-lg hover:shadow-[0_0_24px_-8px] hover:shadow-primary/20 hover:border-primary/30 hover:-translate-y-1 transition-all duration-500">
                    {/* Card Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        {Icon && <Icon className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-zinc-100">
                          {layer.label}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                          {layer.description}
                        </p>
                      </div>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2">
                      {layer.nodes.map((node) => (
                        <TechChip key={node.id} node={node} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Floating Badge */}
        <motion.div
          className="absolute -top-4 right-0 lg:right-8 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium whitespace-nowrap">
              Always learning
            </span>
          </motion.div>
        </motion.div>

        {/* Metrics Strip */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-x-8 gap-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        >
          {metrics.map((m, i) => (
            <div key={m.label} className="flex items-center gap-2">
              <m.icon className="w-4 h-4 text-primary/60 shrink-0" />
              <span className="text-sm text-zinc-400 whitespace-nowrap">
                {m.label}
              </span>
              {i < metrics.length - 1 && (
                <span className="hidden md:block w-px h-4 bg-zinc-700/40 ml-4" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
