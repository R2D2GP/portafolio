export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectChallenge {
  problem: string
  solution: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl: string
  presentacionUrl: string
  introduccionUrl: string
  manualUrl: string
  featured: boolean
  features: ProjectFeature[]
  architecture: string
  challenges: ProjectChallenge[]
}

export const projects: Project[] = [
  {
    id: "ferre-click",
    title: "FerreClick Arequipa",
    tagline: "Sistema Integrado de Gestión Ferretera",
    description:
      "Ecosistema tecnológico diseñado para centralizar y asegurar las operaciones comerciales de una ferretería, unificando contabilidad, inventario, pedidos y generación de códigos de barras.",
    longDescription:
      "FerreClick es un ecosistema tecnológico que centraliza y asegura las operaciones comerciales de la ferretería. El sistema unifica la contabilidad de caja, la gestión de catálogos de inventario, el procesamiento automático de pedidos asistido por IA y la generación de códigos de barras bajo una única plataforma moderna y multiusuario.",
    image: "/projects/ferreclick-aqp.png",
    technologies: ["Python", "CustomTkinter", "PostgreSQL 16", "pgvector", "OpenAI API", "JWT", "rapidfuzz"],
    githubUrl: "#",
    presentacionUrl: "#",
    introduccionUrl: "#",
    manualUrl: "#",
    featured: true,
    features: [
      { title: "Punto de Venta (POS)", description: "Registro transaccional de ingresos y egresos diarios con control multimétodo de pago y generación de arqueo en PDF listo para impresión." },
      { title: "Catálogo Central de Inventarios", description: "Registro permanente de todos los artículos con filtros por categoría y origen. Permite importación masiva desde listas de precios en Excel." },
      { title: "Cotizador Asistido por IA", description: "Traduce mensajes informales de clientes en cotizaciones estructuradas, cruza contra el inventario real y exporta a plantillas Excel." },
      { title: "Lector de PDFs y Códigos de Barra", description: "Procesa lotes de notas de pedido, detecta folios faltantes y genera etiquetas con código Ccode39 desde facturas de proveedores." },
    ],
    architecture: "El sistema opera bajo un modelo híbrido de clientes de escritorio ligeros (CustomTkinter con patrón Frame-switching) conectados a un backend de microservicios orquestado por un gateway Traefik. La autenticación usa JWT con bloqueo por fingerprint de hardware (regla 2 de 3). Toda la información se centraliza en PostgreSQL 16. La búsqueda semántica de productos se procesa localmente con pgvector, eliminando dependencias externas. Los procesos pesados de análisis PDF se envían a colas de tareas en segundo plano para mantener la interfaz fluida.",
    challenges: [
      { problem: "5 aplicaciones de escritorio desconectadas sin base de datos centralizada, imposibilitando el trabajo multiusuario y la auditoría en tiempo real", solution: "Migración a una arquitectura de microservicios con PostgreSQL 16 como fuente de verdad única, permitiendo que múltiples cajeros trabajen simultáneamente con datos actualizados en tiempo real." },
      { problem: "Costos elevados y consultas redundantes a la API de OpenAI por cada cotización, sin ningún mecanismo de caché o control", solution: "Implementación de caché FIFO para las últimas 128 respuestas del LLM y uso de pgvector para búsqueda semántica local, reduciendo drásticamente las llamadas a la API externa." },
    ],
  },
  {
    id: "eximp-frereg",
    title: "Notas Eximp Frereg",
    tagline: "App Móvil de Toma de Pedidos para Ferretería",
    description:
      "Aplicación móvil que moderniza y acelera el proceso de toma de pedidos de vendedores de campo, reemplazando el sistema manual tradicional.",
    longDescription:
      "Aplicación móvil diseñada para la ferretería Eximp Frereg que moderniza y acelera el proceso de toma de pedidos por parte de los vendedores de campo, reemplazando el sistema manual tradicional.",
    image: "/projects/notas-eximp.png",
    technologies: ["AppSheet", "Google Sheets", "OpenAI API"],
    githubUrl: "#",
    presentacionUrl: "#",
    introduccionUrl: "#",
    manualUrl: "#",
    featured: true,
    features: [
      { title: "Gestión de Clientes", description: "Administración de la cartera de clientes con búsqueda dinámica, edición y eliminación. Formularios completos con RUC, dirección, encargado y teléfono." },
      { title: "Carrito de Pedidos", description: "Zona de trabajo activa para armar el pedido del cliente. Permite buscar artículos, ajustar cantidades y precios, y procesar la nota de entrega final." },
      { title: "Notas de Entrega", description: "Panel histórico con filtros avanzados por cliente, fecha, tipo de factura y método de pago. Genera PDF formales con datos fiscales, tabla de contenido y código de barras." },
      { title: "Analíticas de Ventas", description: "Panel con gráfica de barras horizontal y vista tabular que muestra el rendimiento mensual de vendedores y la facturación global de la ferretería." },
    ],
    architecture: "Construida sobre AppSheet, la aplicación se apoya en Google Sheets como base de datos principal, donde las tablas de clientes, productos, pedidos y ventas se sincronizan en tiempo real. La lógica de negocio se implementa mediante fórmulas y reglas de AppSheet, complementadas con expresiones condicionales para el cálculo de precios, descuentos y totales. La generación del PDF formal de notas de pedido se realiza combinando plantillas estructuradas con los datos de cada transacción, produciendo documentos listos para distribución y almacén.",
    challenges: [
      { problem: "Limitaciones de las fórmulas nativas de AppSheet para implementar lógica compleja de precios, descuentos y cálculos condicionales", solution: "Diseño de una arquitectura de fórmulas modulares con expresiones anidadas y columnas virtuales que replican la lógica de negocio sin necesidad de código externo." },
      { problem: "Generación de un PDF formal con estructura fiscal, tabla de contenido y códigos de barra desde una plataforma low-code", solution: "Implementación de una plantilla de documento estructurada que mapea los campos de la transacción a un formato de nota de pedido profesional, aprovechando las capacidades de generación de informes de AppSheet." },
    ],
  },
]
