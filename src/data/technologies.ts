export interface Methodology {
  name: string
  icon: string
  color: string
  description: string
  principles: string[]
}

export const methodologies: Methodology[] = [
  {
    name: "Harness Engineering",
    icon: "🔧",
    color: "#3B82F6",
    description:
      "Construyo entornos de prueba robustos y automatizados que garantizan la calidad del software desde su origen. Cada componente se valida de forma aislada e integrada antes de llegar a producción.",
    principles: [
      "Pruebas automatizadas desde el primer commit",
      "Infraestructura de integración continua confiable",
      "Entornos de prueba reproducibles y efímeros",
      "Validación temprana con test harnesses especializados",
    ],
  },
  {
    name: "Spec-Driven Development (SDD)",
    icon: "📋",
    color: "#8B5CF6",
    description:
      "Las especificaciones son la fuente de verdad del proyecto. Antes de escribir código, defino contratos, tipos y comportamientos esperados, asegurando que cada implementación cumpla exactamente lo acordado.",
    principles: [
      "Especificaciones antes que implementación",
      "Tipos fuertes y contratos explícitos",
      "Documentación viva generada desde las specs",
      "Validación continua contra la especificación",
    ],
  },
]
