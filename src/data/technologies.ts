export interface Methodology {
  name: string
  color: string
  description: string
  principles: string[]
}

export const methodologies: Methodology[] = [
  {
    name: "Harness Engineering",
    color: "var(--color-primary)",
    description: "Construyo entornos de ejecución que permiten a los agentes operar de forma confiable, verificable y reproducible desde el primer día de desarrollo.",
    principles: [
      "Entornos aislados y reproducibles",
      "Validación automática en cada ejecución",
      "Integración continua con pruebas confiables",
      "Observabilidad completa del comportamiento del agente",
    ],
  },
  {
    name: "Loop Engineering",
    color: "var(--color-primary)",
    description: "Diseño ciclos autónomos donde los agentes planifican, ejecutan, evalúan y refinan su trabajo hasta cumplir el objetivo.",
    principles: [
      "Planificación iterativa basada en objetivos",
      "Autoevaluación y corrección continua",
      "Recuperación inteligente ante errores",
      "Optimización mediante ciclos de retroalimentación",
    ],
  },
  {
    name: "Agent Orchestration",
    color: "var(--color-primary)",
    description: "Coordino agentes especializados que colaboran de forma estructurada para resolver problemas complejos como un único sistema inteligente.",
    principles: [
      "Delegación según capacidades del agente",
      "Coordinación de flujos multiagente",
      "Comunicación estructurada entre agentes",
      "Supervisión y validación de resultados",
    ],
  },
  {
    name: "Spec-Driven Development (SDD)",
    color: "var(--color-primary)",
    description: "Cada implementación nace de una especificación clara y verificable, asegurando que el software responda exactamente a los requisitos definidos.",
    principles: [
      "Especificaciones como fuente de verdad",
      "Contratos claros antes de implementar",
      "Validación continua contra la especificación",
      "Documentación alineada con el desarrollo",
    ],
  },
]
