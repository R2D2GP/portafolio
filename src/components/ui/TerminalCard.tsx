"use client"

import { useRef, useReducer, useEffect } from "react"
import { useInView } from "framer-motion"
import { Check } from "lucide-react"
import type { Methodology } from "@/data/technologies"

type AnimationState =
  | { phase: "idle" }
  | { phase: "typing"; typed: number }
  | { phase: "waiting" }
  | { phase: "showing"; line: number }
  | { phase: "done" }

type Action =
  | { type: "start" }
  | { type: "char"; count: number }
  | { type: "wait" }
  | { type: "next_line"; count: number }
  | { type: "finish" }

function reducer(state: AnimationState, action: Action): AnimationState {
  switch (state.phase) {
    case "idle":
      if (action.type === "start") return { phase: "typing", typed: 0 }
      return state
    case "typing":
      if (action.type === "char") return { phase: "typing", typed: action.count }
      if (action.type === "wait") return { phase: "waiting" }
      return state
    case "waiting":
      if (action.type === "next_line") return { phase: "showing", line: 0 }
      return state
    case "showing":
      if (action.type === "next_line") return { phase: "showing", line: action.count }
      if (action.type === "finish") return { phase: "done" }
      return state
    case "done":
      return state
  }
}

function useReducedMotion() {
  const ref = useRef(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    ref.current = mq.matches
    const handler = (e: MediaQueryListEvent) => { ref.current = e.matches }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return ref
}

export function TerminalCard({ methodology }: { methodology: Methodology }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reducedMotion = useReducedMotion()
  const [state, dispatch] = useReducer(reducer, { phase: "idle" })

  const command = methodology.terminal.command
  const lines = methodology.terminal.lines
  const commandLen = command.length
  const totalLines = lines.length

  useEffect(() => {
    if (!isInView || state.phase !== "idle") return
    if (reducedMotion.current) {
      dispatch({ type: "start" })
      dispatch({ type: "char", count: commandLen })
      dispatch({ type: "wait" })
      dispatch({ type: "next_line", count: totalLines })
      dispatch({ type: "finish" })
      return
    }
    dispatch({ type: "start" })
  }, [isInView, state.phase, commandLen, totalLines, reducedMotion])

  useEffect(() => {
    if (state.phase !== "typing") return
    if (reducedMotion.current) return
    if (state.typed >= commandLen) {
      const t = setTimeout(() => dispatch({ type: "wait" }), 400)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => dispatch({ type: "char", count: state.typed + 1 }), 40)
    return () => clearTimeout(t)
  }, [state, commandLen, reducedMotion])

  useEffect(() => {
    if (state.phase !== "waiting") return
    const t = setTimeout(() => dispatch({ type: "next_line", count: 0 }), 300)
    return () => clearTimeout(t)
  }, [state])

  useEffect(() => {
    if (state.phase !== "showing") return
    if (state.line >= totalLines) {
      const t = setTimeout(() => dispatch({ type: "finish" }), 200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => dispatch({ type: "next_line", count: state.line + 1 }), 180)
    return () => clearTimeout(t)
  }, [state, totalLines])

  return (
    <div ref={ref} className="group">
      <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/90 backdrop-blur-sm shadow-lg hover:shadow-[0_0_24px_-8px] hover:shadow-primary/15 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
        <div className="px-4 py-2.5 bg-zinc-800/60 border-b border-zinc-700/30">
          <span className="text-[11px] text-zinc-500 font-medium">bash</span>
        </div>
        <div className="p-5 font-mono text-sm leading-relaxed">
          <div className="flex items-start gap-2">
            <span className="text-primary shrink-0 select-none">$</span>
            <span className="text-zinc-200">
              {state.phase === "idle" ? "" : methodology.terminal.command.slice(0, state.phase === "typing" ? state.typed : commandLen)}
              {(state.phase === "typing" && state.typed < commandLen) && (
                <span className="text-primary animate-[blink_1s_step-end_infinite]">▌</span>
              )}
            </span>
          </div>
          {state.phase !== "idle" && state.phase !== "typing" && (
            <div className="mt-2 space-y-1">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    i < (state.phase === "showing" ? state.line : totalLines)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  } ${line.type === "highlight" ? "text-primary font-semibold" : "text-zinc-400"}`}
                >
                  {line.type === "success" && <Check className="w-4 h-4 text-primary shrink-0" />}
                  {line.type === "highlight" && <span className="w-4 shrink-0" />}
                  {(line.type === "output" || line.type === "command") && <span className="w-4 shrink-0" />}
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
          )}
          {state.phase === "done" && (
            <span className="text-primary animate-[blink_1s_step-end_infinite]">▌</span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-zinc-100 font-heading">
          {methodology.name}
        </h3>
        <p className="text-sm text-zinc-500 mt-0.5">
          {methodology.tagline}
        </p>
      </div>
    </div>
  )
}
