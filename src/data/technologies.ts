export interface TerminalLine {
  type: "command" | "output" | "success" | "highlight"
  text: string
}

export interface Methodology {
  name: string
  tagline: string
  terminal: {
    command: string
    lines: TerminalLine[]
  }
}

export const methodologies: Methodology[] = [
  {
    name: "Harness Engineering",
    tagline: "Entornos de ejecución confiables.",
    terminal: {
      command: "harness-engineering",
      lines: [
        { type: "output", text: "Context ready" },
        { type: "output", text: "Validation enabled" },
        { type: "output", text: "Test environment created" },
        { type: "output", text: "Observability connected" },
        { type: "highlight", text: "Status: READY" },
      ],
    },
  },
  {
    name: "Loop Engineering",
    tagline: "Ciclos autónomos que se autocorrigen.",
    terminal: {
      command: "loop-engineering",
      lines: [
        { type: "output", text: "Planning..." },
        { type: "output", text: "Executing..." },
        { type: "output", text: "Evaluating..." },
        { type: "output", text: "Retrying..." },
        { type: "success", text: "Goal achieved" },
      ],
    },
  },
  {
    name: "Agent Orchestration",
    tagline: "Coordinación multiagente a escala.",
    terminal: {
      command: "agent-orchestration",
      lines: [
        { type: "output", text: "Planner connected" },
        { type: "output", text: "Research ready" },
        { type: "output", text: "Coder running" },
        { type: "output", text: "Reviewer active" },
        { type: "success", text: "Workflow completed" },
      ],
    },
  },
  {
    name: "Spec-Driven Development",
    tagline: "Implementación guiada por contratos.",
    terminal: {
      command: "spec-driven-development",
      lines: [
        { type: "output", text: "Reading specification..." },
        { type: "output", text: "Generating contracts..." },
        { type: "output", text: "Validating implementation..." },
        { type: "success", text: "Specification satisfied" },
      ],
    },
  },
]
