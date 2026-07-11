"use client"

import { useRef, useState, useMemo, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { useSyncExternalStore } from "react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { stackLayers } from "@/data/aistack"

const NODE_W = 110
const NODE_H = 36
const NODE_GAP = 16
const LAYER_GAP = 64
const LABEL_H = 16
const LABEL_MB = 12

interface Connection {
  nodeId: string
  x1: number
  y1: number
  x2: number
  y2: number
}

interface NodeLayout {
  id: string
  cx: number
  cy: number
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

function computeLayout(containerW: number) {
  if (containerW === 0) return { connections: [] as Connection[], nodeLayouts: [] as NodeLayout[] }

  const connections: Connection[] = []
  const nodeLayouts: NodeLayout[] = []
  const layerInnerH = LABEL_H + LABEL_MB + NODE_H

  const layerBounds = stackLayers.map((layer, i) => {
    const top = i * (layerInnerH + LAYER_GAP)
    const nodesTop = top + LABEL_H + LABEL_MB
    const bottom = top + layerInnerH
    return { top, nodesTop, bottom }
  })

  stackLayers.forEach((layer, i) => {
    const totalW = layer.nodes.length * NODE_W + (layer.nodes.length - 1) * NODE_GAP
    const startX = Math.max((containerW - totalW) / 2, 8)

    layer.nodes.forEach((node, j) => {
      const cx = startX + j * (NODE_W + NODE_GAP) + NODE_W / 2
      const cy = layerBounds[i].nodesTop + NODE_H / 2
      nodeLayouts.push({ id: node.id, cx, cy })
    })

    if (i < stackLayers.length - 1) {
      const fromBottom = layerBounds[i].bottom
      const toTop = layerBounds[i + 1].top
      layer.nodes.forEach((node, j) => {
        const cx = startX + j * (NODE_W + NODE_GAP) + NODE_W / 2
        connections.push({ nodeId: node.id, x1: cx, y1: fromBottom, x2: cx, y2: toTop })
      })
    }
  })

  return { connections, nodeLayouts }
}

export function AIStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const graphRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const size = useContainerSize(graphRef)

  const { connections, nodeLayouts } = useMemo(() => computeLayout(size.w), [size.w])

  const allNodes = stackLayers.flatMap((l) => l.nodes)
  const tooltipNode = hoveredNode ? allNodes.find((n) => n.id === hoveredNode) : null
  const tooltipLayout = hoveredNode ? nodeLayouts.find((n) => n.id === hoveredNode) : null

  return (
    <section
      ref={sectionRef}
      id="ai-stack"
      className="min-h-screen flex flex-col justify-center px-4 py-20"
    >
      <div className="max-w-4xl mx-auto w-full">
        <AnimatedSection >
          <SectionHeading
            title="AI Stack"
            subtitle="Un ecosistema conectado de herramientas para construir sistemas de IA."
            align="center"
          />
        </AnimatedSection>

        <div ref={graphRef} className="relative mt-16">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: "visible" }}
          >
            {connections.map((conn) => (
              <motion.path
                key={conn.nodeId}
                d={`M ${conn.x1} ${conn.y1} L ${conn.x2} ${conn.y2}`}
                fill="none"
                stroke="#68C3A9"
                strokeWidth={hoveredNode ? (hoveredNode === conn.nodeId ? 1.5 : 0.5) : 0.8}
                strokeOpacity={hoveredNode ? (hoveredNode === conn.nodeId ? 0.7 : 0.08) : 0.18}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
              />
            ))}
          </svg>

          <div
            className="relative z-10 flex flex-col items-center"
            style={{ gap: `${LAYER_GAP}px` }}
          >
            {stackLayers.map((layer, i) => (
              <motion.div
                key={layer.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-widest uppercase mb-3 select-none">
                  {layer.icon} {layer.label}
                </span>
                <div className="flex justify-center gap-x-4">
                  {layer.nodes.map((node) => {
                    const isHovered = hoveredNode === node.id
                    const isDimmed = hoveredNode !== null && !isHovered
                    return (
                      <div
                        key={node.id}
                        className={`w-[110px] h-9 flex items-center justify-center rounded-lg border text-sm font-mono transition-all duration-300 cursor-default select-none ${
                          isHovered
                            ? "border-primary/60 bg-primary/5 shadow-[0_0_16px_-4px] shadow-primary/20 scale-105"
                            : isDimmed
                              ? "border-zinc-200/30 dark:border-zinc-700/20 bg-white/10 dark:bg-zinc-800/5 text-zinc-400/50 dark:text-zinc-500/50"
                              : "border-zinc-200 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/20 text-zinc-700 dark:text-zinc-300"
                        }`}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <span
                          className={`text-sm transition-colors duration-300 ${
                            isHovered
                              ? "text-primary"
                              : isDimmed
                                ? "text-zinc-400/50 dark:text-zinc-500/50"
                                : "text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {node.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {tooltipNode && tooltipLayout && (
            <motion.div
              className="absolute z-20 pointer-events-none"
              style={{
                left: tooltipLayout.cx,
                top: tooltipLayout.cy + NODE_H / 2 + 14,
                transform: "translateX(-50%)",
              }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs shadow-xl whitespace-nowrap">
                <span className="font-semibold">{tooltipNode.label}</span>
                <span className="opacity-70 ml-2">{tooltipNode.description}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
