"use client"

import { useRef, useState, useMemo, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { useSyncExternalStore } from "react"
import { SectionHeading } from "@/components/shared/SectionHeading"

interface NodeDef {
  id: string
  label: string
  x: number
  y: number
  description: string
  isCenter: boolean
}

interface ConnectionDef {
  from: string
  to: string
}

interface NodeLayout {
  id: string
  px: number
  py: number
  r: number
}

const NODES: NodeDef[] = [
  { id: "center", label: "Engineering Mindset", x: 50, y: 52, description: "El marco que guía cada decisión técnica que tomo.", isCenter: true },
  { id: "human-first", label: "Human First", x: 50, y: 10, description: "La IA amplifica el criterio humano.", isCenter: false },
  { id: "systems-thinking", label: "Systems Thinking", x: 16, y: 32, description: "Diseño sistemas completos, no soluciones aisladas.", isCenter: false },
  { id: "simplicity", label: "Simplicity by Design", x: 84, y: 32, description: "La complejidad pertenece a la arquitectura, no al usuario.", isCenter: false },
  { id: "verification", label: "Trust through Verification", x: 26, y: 76, description: "Todo resultado debe poder observarse y verificarse.", isCenter: false },
  { id: "evolution", label: "Continuous Evolution", x: 74, y: 76, description: "Cada iteración mejora el sistema.", isCenter: false },
]

const CONNECTIONS: ConnectionDef[] = [
  { from: "center", to: "human-first" },
  { from: "center", to: "systems-thinking" },
  { from: "center", to: "simplicity" },
  { from: "center", to: "verification" },
  { from: "center", to: "evolution" },
  { from: "human-first", to: "systems-thinking" },
  { from: "human-first", to: "simplicity" },
  { from: "systems-thinking", to: "simplicity" },
  { from: "systems-thinking", to: "verification" },
  { from: "systems-thinking", to: "evolution" },
  { from: "simplicity", to: "verification" },
  { from: "simplicity", to: "evolution" },
  { from: "verification", to: "evolution" },
]

const CENTER_R = 28
const NODE_R = 20

function stars(count: number, seed = 42) {
  const result: { x: number; y: number; o: number }[] = []
  let s = seed
  for (let i = 0; i < count; i++) {
    s = (s * 16807) % 2147483647
    const x = (s % 1000) / 10
    s = (s * 16807) % 2147483647
    const y = (s % 1000) / 10
    s = (s * 16807) % 2147483647
    const o = 0.04 + (s % 8) * 0.01
    result.push({ x, y, o })
  }
  return result
}

function useContainerSize(ref: React.RefObject<HTMLElement | null>) {
  const cachedRef = useRef({ w: 0, h: 0 })

  const subscribe = useCallback(
    (callback: () => void) => {
      const el = ref.current
      if (!el) return () => {}
      const ro = new ResizeObserver(() => callback())
      ro.observe(el)
      return () => ro.disconnect()
    },
    [ref],
  )

  const getSnapshot = useCallback(() => {
    const el = ref.current
    if (!el) return cachedRef.current
    const w = el.clientWidth
    const h = el.clientHeight
    if (cachedRef.current.w !== w || cachedRef.current.h !== h) {
      cachedRef.current = { w, h }
    }
    return cachedRef.current
  }, [ref])

  const getServerSnapshot = useCallback(() => cachedRef.current, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function getConnectionSet(id: string) {
  const set = new Set<string>()
  CONNECTIONS.forEach((c) => {
    if (c.from === id) set.add(c.to)
    if (c.to === id) set.add(c.from)
  })
  return set
}

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const graphRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const size = useContainerSize(graphRef)

  const starDots = useMemo(() => stars(60), [])

  const nodeLayouts = useMemo((): NodeLayout[] => {
    if (size.w === 0) return []
    return NODES.map((n) => ({
      id: n.id,
      px: (n.x / 100) * size.w,
      py: (n.y / 100) * size.h,
      r: n.isCenter ? CENTER_R : NODE_R,
    }))
  }, [size])

  const nodeMap = useMemo(() => {
    const map = new Map<string, NodeLayout>()
    nodeLayouts.forEach((n) => map.set(n.id, n))
    return map
  }, [nodeLayouts])

  const connectedToHovered = useMemo(() => {
    if (!hoveredNode) return null
    return getConnectionSet(hoveredNode)
  }, [hoveredNode])

  const isConnected = useCallback(
    (nodeId: string) => {
      if (!hoveredNode || hoveredNode === nodeId) return true
      return connectedToHovered?.has(nodeId) ?? true
    },
    [hoveredNode, connectedToHovered],
  )

  const tooltipNode = hoveredNode ? NODES.find((n) => n.id === hoveredNode) : null
  const tooltipLayout = hoveredNode ? nodeMap.get(hoveredNode) : null

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-4xl mx-auto w-full">
        <AnimatedBlock delay={0}>
          <SectionHeading
            title="Engineering Mindset"
            subtitle="Los principios que gu\u00EDan cada sistema que construyo."
            align="left"
          />
        </AnimatedBlock>

        <AnimatedBlock delay={0.12}>
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-6">
            <blockquote className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 border-l-4 border-l-primary pl-5">
              Creo que el futuro del software pertenece a quienes diseñan sistemas
              capaces de colaborar con la inteligencia artificial. Mi trabajo consiste en
              convertir procesos complejos en experiencias simples, rápidas y eficientes
              mediante automatización, agentes inteligentes y una arquitectura sólida.
            </blockquote>
          </div>
        </AnimatedBlock>

        <div className="relative w-full mt-14" style={{ aspectRatio: "16/9" }}>
          <div ref={graphRef} className="absolute inset-0">
            <svg className="w-full h-full pointer-events-none">
              {starDots.map((s, i) => (
                <circle
                  key={i}
                  cx={`${s.x}%`}
                  cy={`${s.y}%`}
                  r={1}
                  fill="#68C3A9"
                  opacity={s.o}
                />
              ))}
            </svg>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {CONNECTIONS.map((c, i) => {
                const from = nodeMap.get(c.from)
                const to = nodeMap.get(c.to)
                if (!from || !to) return null

                const isHighlighted =
                  hoveredNode === c.from || hoveredNode === c.to
                const isDimmed = hoveredNode !== null && !isHighlighted

                return (
                  <motion.line
                    key={`${c.from}-${c.to}`}
                    x1={from.px}
                    y1={from.py}
                    x2={to.px}
                    y2={to.py}
                    stroke="#68C3A9"
                    strokeWidth={isHighlighted ? 2 : 1}
                    strokeOpacity={isDimmed ? 0.04 : isHighlighted ? 0.55 : 0.14}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isInView
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{
                      pathLength: { duration: 0.8, delay: 0.25 + i * 0.04, ease: "easeInOut" },
                      opacity: { duration: 0.3, delay: 0.25 + i * 0.04 },
                    }}
                  />
                )
              })}
            </svg>

            <div className="absolute inset-0">
              {NODES.map((node, i) => {
                const layout = nodeMap.get(node.id)
                if (!layout) return null
                const isHovered = hoveredNode === node.id
                const dimmed = hoveredNode !== null && !isConnected(node.id)

                return (
                  <motion.div
                    key={node.id}
                    className="absolute flex items-center justify-center cursor-default select-none"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      width: layout.r * 2 + 8,
                      height: layout.r * 2 + 8,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            scale: isHovered ? 1.25 : 1,
                            opacity: dimmed ? 0.15 : 1,
                          }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      scale: { duration: 0.45, delay: node.isCenter ? 0.8 : 0.4 + i * 0.06, ease: "easeOut" },
                      opacity: { duration: 0.3, delay: node.isCenter ? 0.8 : 0.4 + i * 0.06 },
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className={`rounded-full border transition-all duration-300 ${
                        isHovered
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_-4px] shadow-primary/40"
                          : "border-primary/30 bg-primary/5"
                      }`}
                      style={{
                        width: layout.r * 2,
                        height: layout.r * 2,
                      }}
                    />
                    {node.isCenter && (
                      <span
                        className={`absolute top-full mt-2 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                          isHovered
                            ? "text-primary"
                            : dimmed
                              ? "text-zinc-500/40"
                              : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        {node.label}
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {tooltipNode && tooltipLayout && (
              <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: `${tooltipNode.x}%`,
                  top: `${tooltipNode.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <div
                  className="absolute left-1/2 px-3 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs shadow-xl whitespace-nowrap"
                  style={{ transform: "translateX(-50%)", bottom: "calc(50% + 28px)" }}
                >
                  <span className="font-semibold">{tooltipNode.label}</span>
                  <p className="text-[11px] opacity-70 mt-0.5 max-w-48 whitespace-normal">
                    {tooltipNode.description}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function AnimatedBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.45, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
