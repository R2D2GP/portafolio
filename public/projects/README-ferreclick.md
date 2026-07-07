# Ferre Click Arequipa — Sistema Integrado de Gestión Ferretera

Ferre Click es un ecosistema tecnológico diseñado para centralizar y asegurar las operaciones comerciales de la ferretería. El sistema unifica la contabilidad de caja, la gestión de catálogos de inventario, el procesamiento automático de pedidos y la generación de códigos de barras bajo una única plataforma moderna y multiusuario.

---

## 🎯 1. ¿Por qué existe el sistema? (El Problema)

Originalmente, la ferretería operaba mediante **5 aplicaciones de escritorio desconectadas** creadas en Python y CustomTkinter. Cada módulo era un silo de información independiente sin base de datos centralizada ni backend:

* **Inviabilidad Multiusuario:** Las ventas y egresos se guardaban en archivos JSON locales, impidiendo que múltiples cajeros trabajaran en simultáneo o que la administración auditara las transacciones en tiempo real.
* **Costos y Redundancia de IA:** Las herramientas de cotización realizaban llamadas directas y repetitivas a APIs de OpenAI para interpretar pedidos de WhatsApp, careciendo de mecanismos de control de costos o almacenamiento en caché.
* **Dependencia de Archivos Locales:** Los catálogos de productos y clientes se gestionaban mediante múltiples hojas de cálculo Excel dispersas (`lista.xlsx`, `productos.xlsx`, `clientes.xlsx`), propensas a duplicados, errores de digitación y desincronización.
* **Vulnerabilidad de Seguridad:** No existía autenticación real de usuarios ni control de roles. El acceso se limitaba con tokens de tiempo efímeros inyectados en variables de entorno, vulnerables a la manipulación local de los equipos.

---

## 💼 2. ¿Para qué sirve? (Funcionalidades de Negocio)

El sistema consolidado resuelve la fragmentación operativa proporcionando las siguientes funcionalidades:

### 💰 Caja Tienda (Punto de Venta / POS)
* **Registro de Transacciones:** Permite registrar los ingresos y egresos diarios de la ferretería de manera transaccional y auditable.
* **Control Multimétodo de Pago:** Admite registrar múltiples métodos de pago por movimiento y los organiza en columnas específicas (Efectivo obligatorio en ingresos, primer canal de transferencia/Yape, y segundo canal/BCP o Yape alternativo) para facilitar el arqueo.
* **Arqueo y Conciliación:** Genera reportes de caja en PDF listos para impresión en blanco y negro, aplicando una tabla de conciliación de efectivo que resta de manera exacta los cobros por transferencias electrónicas.

### 📦 Catálogo Central de Inventarios
* **Control de Productos:** Mantiene un registro permanente de todos los artículos de la ferretería con filtros de categorías y origen.
* **Importación Masiva:** Permite alimentar y actualizar el sistema a partir de las listas de precios en formato Excel enviadas por los proveedores.

### 🤖 Cotizador Asistido por Inteligencia Artificial (Notas de Entrega)
* **Traducción de Lenguaje Natural:** Recibe transcripciones de audio o mensajes de texto informales de clientes (ej. "8 bolsones de codo de 1/2 y un paquete de tubo de 3/4") y los convierte automáticamente en una cotización estructurada.
* **Matching Difuso y Conversión de Unidades:** Cruza los pedidos normalizados por el LLM contra el inventario real del catálogo mediante algoritmos de proximidad de texto (`rapidfuzz`). Convierte de forma inteligente embalajes de mayoreo (bolsones, cajas, paquetes) a cantidades unitarias según el factor de conversión registrado.
* **Exportación y Limpieza:** Permite exportar la cotización final directamente a una plantilla formal en Excel, vaciando automáticamente las tablas temporales de cotización para evitar la sobrecarga del sistema.

### 📄 Lector de Notas de Pedido (PDFs)
* **Extracción de Datos Masiva:** Procesa lotes de notas de pedido en formato PDF, identificando el cliente, vendedor, zona comercial y montos de facturación.
* **Detección de Vacíos (Gaps):** Analiza la secuencia numérica de los comprobantes cargados e identifica folios faltantes (saltos de numeración), alertando en color rojo sobre posibles pérdidas de documentación o problemas de facturación.

### 🏷️ Generador de Códigos de Barra
* **Escaneo de Compras:** Lee las facturas de proveedores en PDF, asocia los ítems adquiridos con los productos del catálogo y genera un archivo de Excel configurado con la tipografía de escáner especial **Ccode39** (delimitada por asteriscos `*CODE*`) listo para la impresión física de etiquetas.

---

## ⚙️ 3. ¿Cómo funciona? (Arquitectura y Mecanismos)

El sistema opera bajo un modelo híbrido de **Clientes de Escritorio Ligeros** conectados a un **Backend de Microservicios**:

```
┌──────────────────────────────────────────────────────────────────┐
│              INTERFACE DESKTOP (CustomTkinter UI)                │
│         - Ventana Única (Patrón Frame-Switching)                 │
│         - Consumo Async HTTPX (Bearer Token JWT)                 │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ HTTPS (Puerto 443)
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                       GATEWAY DE APIS (Traefik)                  │
│         - Validación de JWT & Fingerprint de Hardware             │
│         - Rate Limiting (Protección contra fuerza bruta)          │
└────────┬──────────────┬──────────────┬──────────────┬────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │ Auth Svc │   │ POS Svc  │   │CatalogSvc│   │QuotingSvc│ ...
   └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘
        │              │              │              │
        └──────────────┴──────┬───────┴──────────────┘
                              ▼
           ┌───────────────────────────────────────┐
           │        PostgreSQL 16 (pgvector)       │
           │        - Base de Datos Principal      │
           │        - Búsquedas Vectoriales        │
           └───────────────────────────────────────┘
```

### Mecanismos Clave:

1. **Persistencia y Búsqueda Vectorial (`pgvector`):**
   Toda la información se centraliza en PostgreSQL 16. La búsqueda semántica de productos del cotizador se procesa en la base de datos local usando vectores de características textuales (`pgvector`), eliminando dependencias de bases de datos vectoriales externas (como Pinecone) y reduciendo costos.

2. **Seguridad y Control de Acceso (RBAC y JWT):**
   Los usuarios se validan ante el `auth-service` y obtienen un JSON Web Token (JWT) firmado que viaja cifrado en cada petición. Las APIs REST restringen las peticiones si el rol del usuario no tiene los permisos necesarios para la acción solicitada.

3. **Bloqueo por Máquina (Fingerprint de Hardware):**
   Para evitar el uso de la aplicación desktop en equipos no autorizados, el software recopila la firma del hardware físico (dirección MAC activa, número de serie del disco duro y número de serie de la placa base) y aplica una regla de coincidencia **2 de 3** contra el servidor de licencias, limitando el uso a un máximo de 3 máquinas.

4. **Optimización de Recursos e IA (Caching y Colas):**
   * **Caché FIFO:** El cotizador almacena en una caché interna las últimas 128 respuestas del modelo de lenguaje para evitar re-consultar a OpenAI si el cliente reenvía el mismo pedido.
   * **Colas Redis (RQ):** Los procesos pesados de análisis de archivos PDFs y consultas complejas se envían a hilos de ejecución en segundo plano mediante colas de tareas, garantizando que la aplicación de escritorio permanezca siempre fluida y responsiva para el operario.

5. **Diseño de Interfaz Responsivo en Windows:**
   El frontend CustomTkinter evita fugas de memoria y bloqueos de interfaz mediante un patrón de **Frame-switching** (una sola ventana raíz donde las pantallas se inyectan y destruyen de forma dinámica) y el manejo de peticiones en hilos de fondo (*threading*).
