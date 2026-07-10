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
  description: string[]
  isCenter: boolean
  r: number
}

interface NodePos {
  id: string
  px: number
  py: number
  r: number
}

interface ConnectionGeom {
  id: string
  from: string
  to: string
  d: string
}

const NODES: NodeDef[] = [
  { id: "center", label: "Engineering DNA", x: 50, y: 38, description: ["El c\u00F3digo gen\u00E9tico de cada", "sistema que construyo."], isCenter: true, r: 32 },
  { id: "human-first", label: "Human First", x: 20, y: 16, description: ["La IA debe potenciar el criterio", "humano. Nunca reemplazar", "decisiones importantes."], isCenter: false, r: 18 },
  { id: "systems-thinking", label: "Systems Thinking", x: 80, y: 16, description: ["Construyo sistemas completos.", "No funcionalidades aisladas."], isCenter: false, r: 18 },
  { id: "simplicity", label: "Simplicity by Design", x: 14, y: 70, description: ["La complejidad pertenece", "a la arquitectura,", "no al usuario."], isCenter: false, r: 18 },
  { id: "verification", label: "Trust through Verification", x: 50, y: 84, description: ["Todo resultado debe poder", "observarse, medirse", "y verificarse."], isCenter: false, r: 18 },
  { id: "evolution", label: "Continuous Evolution", x: 86, y: 70, description: ["Los sistemas inteligentes", "mejoran mediante", "iteraci\u00F3n constante."], isCenter: false, r: 18 },
]

function allPairs<T>(items: T[]): [T, T][] {
  const pairs: [T, T][] = []
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      pairs.push([items[i], items[j]])
    }
  }
  return pairs
}

const CONNECTION_PAIRS: [string, string][] = allPairs(NODES.map((n) => n.id))

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

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", cb)
      return () => mql.removeEventListener("change", cb)
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function bezierPath(a: NodePos, b: NodePos, seed: number): string {
  const dx = b.px - a.px
  const dy = b.py - a.py
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len < 1) return `M ${a.px} ${a.py} L ${b.px} ${b.py}`

  const perpx = -dy / len
  const bend = ((seed % 11) - 5) / 10
  const offset = len * 0.18 * bend

  const cx1 = a.px + dx * 0.3 + perpx * offset
  const cy1 = a.py + dy * 0.3 + perpx * offset
  const cx2 = a.px + dx * 0.7 + perpx * offset
  const cy2 = a.py + dy * 0.7 + perpx * offset

  return `M ${a.px.toFixed(1)} ${a.py.toFixed(1)} C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${b.px.toFixed(1)} ${b.py.toFixed(1)}`
}

function generateNeuralDots() {
  let s = 42
  const dots: { x: number; y: number; r: number; o: number }[] = []
  for (let i = 0; i < 50; i++) {
    s = (s * 16807) % 2147483647
    const x = 2 + (s % 96)
    s = (s * 16807) % 2147483647
    const y = 2 + (s % 96)
    s = (s * 16807) % 2147483647
    const r = 0.4 + (s % 3) * 0.3
    s = (s * 16807) % 2147483647
    const o = 0.02 + (s % 6) * 0.006
    dots.push({ x, y, r, o })
  }
  return dots
}

function NeuralDots({ isInView }: { isInView: boolean }) {
  const dots = useMemo(() => generateNeuralDots(), [])
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={`${d.x}%`}
          cy={`${d.y}%`}
          r={d.r}
          fill="#68C3A9"
          opacity={d.o}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: d.o } : { opacity: 0 }}
          transition={{ duration: 1, delay: i * 0.01 }}
        />
      ))}
    </svg>
  )
}

function NeuralDesktop({
  isInView, size, graphRef,
  hoveredNode, setHoveredNode,
  selectedNode, onNodeClick,
}: {
  isInView: boolean
  size: { w: number; h: number }
  graphRef: React.RefObject<HTMLDivElement | null>
  hoveredNode: string | null
  setHoveredNode: (id: string | null) => void
  selectedNode: string | null
  onNodeClick: (id: string) => void
}) {
  const activeId = selectedNode ?? hoveredNode

  const positions = useMemo((): NodePos[] => {
    if (size.w === 0 || size.h === 0) return []
    return NODES.map((n) => ({
      id: n.id,
      px: (n.x / 100) * size.w,
      py: (n.y / 100) * size.h,
      r: n.r,
    }))
  }, [size])

  const posMap = useMemo(() => {
    const map = new Map<string, NodePos>()
    positions.forEach((p) => map.set(p.id, p))
    return map
  }, [positions])

  const connections = useMemo((): ConnectionGeom[] => {
    const map = posMap
    return CONNECTION_PAIRS.map(([from, to], i) => {
      const a = map.get(from)
      const b = map.get(to)
      if (!a || !b) return { id: `${from}-${to}`, from, to, d: "" }
      return {
        id: `${from}-${to}`,
        from,
        to,
        d: bezierPath(a, b, i * 7 + 13),
      }
    })
  }, [posMap])

  const connectedTo = useMemo(() => {
    if (!activeId) return null
    const set = new Set<string>()
    CONNECTION_PAIRS.forEach(([a, b]) => {
      if (a === activeId) set.add(b)
      if (b === activeId) set.add(a)
    })
    return set
  }, [activeId])

  const getDimState = useCallback(
    (nodeId: string) => {
      if (!activeId) return { dimmed: false, active: false }
      if (activeId === nodeId) return { dimmed: false, active: true }
      if (activeId === "center") return { dimmed: false, active: false }
      const isRelated = nodeId === "center" || connectedTo?.has(nodeId)
      return { dimmed: !isRelated, active: false }
    },
    [activeId, connectedTo],
  )

  const panelNode = activeId ? NODES.find((n) => n.id === activeId) : null
  const panelPos = activeId ? posMap.get(activeId) : null
  const isPinned = selectedNode !== null

  return (
    <div ref={graphRef} className="absolute inset-0">
      <NeuralDots isInView={isInView} />

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((conn) => {
          if (!conn.d) return null
          const isConnected = activeId === conn.from || activeId === conn.to
          const isDimmed = activeId !== null && !isConnected

          return (
            <motion.path
              key={conn.id}
              d={conn.d}
              fill="none"
              stroke="#68C3A9"
              strokeWidth={isConnected ? 1.8 : 0.8}
              strokeOpacity={isDimmed ? 0.03 : isConnected ? 0.55 : 0.12}
              strokeDasharray={isConnected ? "3 24" : "none"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? {
                      pathLength: 1,
                      opacity: isDimmed ? 0.03 : isConnected ? 0.55 : 0.12,
                      strokeDashoffset: isConnected ? [-27, 0] : 0,
                    }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 0.6, delay: 0.2, ease: "easeInOut" },
                opacity: { duration: 0.3, delay: 0.2 },
                strokeDashoffset: isConnected
                  ? { duration: 0.8, repeat: Infinity, ease: "linear" }
                  : { duration: 0.3 },
              }}
            />
          )
        })}
      </svg>

      <div className="absolute inset-0">
        {positions.map((pos) => {
          const node = NODES.find((n) => n.id === pos.id)
          if (!node) return null
          const { dimmed, active } = getDimState(pos.id)

          return (
            <motion.div
              key={pos.id}
              className="absolute flex items-center justify-center cursor-pointer select-none"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: pos.r * 2 + 8,
                height: pos.r * 2 + 8,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView
                  ? {
                      scale: active ? 1.2 : dimmed ? 0.7 : 1,
                      opacity: dimmed ? 0.15 : 1,
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                scale: { duration: 0.4, delay: node.isCenter ? 0.2 : 0.4 + NODES.indexOf(node) * 0.06, ease: "easeOut" },
                opacity: { duration: 0.3, delay: node.isCenter ? 0.2 : 0.4 + NODES.indexOf(node) * 0.06 },
              }}
              onMouseEnter={() => !selectedNode && setHoveredNode(pos.id)}
              onMouseLeave={() => !selectedNode && setHoveredNode(null)}
              onClick={() => onNodeClick(pos.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNodeClick(pos.id) }}
            >
              <div
                className={`rounded-full border transition-all duration-300 ${
                  active
                    ? "border-primary bg-primary/20 shadow-[0_0_20px_-4px] shadow-primary/50"
                    : "border-primary/25 bg-primary/5"
                }`}
                style={{ width: pos.r * 2, height: pos.r * 2 }}
              />
              {node.isCenter && (
                <span
                  className={`absolute top-full mt-2.5 text-xs font-semibold whitespace-nowrap tracking-wider transition-colors duration-300 ${
                    active ? "text-primary" : dimmed ? "text-zinc-500/30" : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  Engineering DNA
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {panelNode && panelPos && panelNode.id !== "center" && (
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${panelNode.x}%`,
            top: `${panelNode.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute left-1/2 px-3.5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl"
            style={{ transform: "translateX(-50%)", bottom: "calc(50% + 22px)", width: "max-content", maxWidth: 220 }}
          >
            <p className="text-xs font-semibold">{panelNode.label}</p>
            {panelNode.description.map((line, i) => (
              <p key={i} className="text-[11px] opacity-70 mt-0.5 leading-snug">{line}</p>
            ))}
            {isPinned && <p className="text-[10px] opacity-40 mt-1.5 tracking-wider uppercase">Pinned</p>}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function MobileLayout({ isInView }: { isInView: boolean }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const allNodes = [...NODES]

  return (
    <div className="relative flex flex-col items-start w-full max-w-sm mx-auto px-4">
      <svg className="absolute left-[23px] top-8 h-[calc(100%-32px)] w-0.5 pointer-events-none">
        <motion.line
          x1="0" y1="0" x2="0" y2="100%"
          stroke="#68C3A9" strokeWidth={1} strokeOpacity={0.25}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>

      {allNodes.map((node, i) => {
        const isExpanded = expandedId === node.id
        return (
          <motion.div
            key={node.id}
            className="relative flex flex-col w-full"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
          >
            <button
              onClick={() => setExpandedId((prev) => (prev === node.id ? null : node.id))}
              className={`flex items-center gap-3 w-full text-left py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg ${node.isCenter ? "mt-2 mb-1" : ""}`}
              aria-expanded={isExpanded}
            >
              <div
                className={`shrink-0 rounded-full border transition-all duration-300 ${
                  isExpanded ? "border-primary bg-primary/15" : "border-primary/25 bg-primary/5"
                } ${node.isCenter ? "w-5 h-5" : "w-3.5 h-3.5"}`}
              />
              <span
                className={`transition-colors duration-300 ${isExpanded ? "text-primary" : "text-zinc-700 dark:text-zinc-300"} ${node.isCenter ? "text-sm font-semibold tracking-wider" : "text-sm"}`}
              >
                {node.label}
              </span>
            </button>

            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden ml-8 pb-3"
              >
                {node.description.map((line, j) => (
                  <p key={j} className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">{line}</p>
                ))}
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const graphRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const isMobile = useMediaQuery("(max-width: 767px)")
  const size = useContainerSize(graphRef)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const handleNodeClick = useCallback((id: string) => {
    setSelectedNode((prev) => (prev === id ? null : id))
    setHoveredNode(null)
  }, [])

  const handleBgClick = useCallback(() => {
    if (selectedNode) setSelectedNode(null)
  }, [selectedNode])

  return (
    <section ref={sectionRef} id="philosophy" className="min-h-screen flex flex-col justify-center px-4 py-20">
      <div className={`mx-auto w-full ${isMobile ? "max-w-sm" : "max-w-4xl"}`}>
        <AnimatedBlock delay={0}>
          <SectionHeading title="Engineering DNA" align="left" />
        </AnimatedBlock>

        <AnimatedBlock delay={0.1}>
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-6">
            <blockquote className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 border-l-4 border-l-primary pl-5">
              Creo que el futuro del software pertenece a quienes diseñan sistemas
              capaces de colaborar con la inteligencia artificial. Mi trabajo consiste en
              convertir procesos complejos en experiencias simples, rápidas y eficientes
              mediante automatización, agentes inteligentes y una arquitectura sólida.
            </blockquote>
          </div>
        </AnimatedBlock>

        {isMobile ? (
          <div className="relative mt-14">
            <MobileLayout isInView={isInView} />
          </div>
        ) : (
          <div className="relative w-full mt-14" style={{ aspectRatio: "16/9" }} onClick={handleBgClick}>
            <NeuralDesktop
              isInView={isInView}
              size={size}
              graphRef={graphRef}
              hoveredNode={hoveredNode}
              setHoveredNode={setHoveredNode}
              selectedNode={selectedNode}
              onNodeClick={handleNodeClick}
            />
          </div>
        )}
      </div>
    </section>
  )
}

function AnimatedBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
