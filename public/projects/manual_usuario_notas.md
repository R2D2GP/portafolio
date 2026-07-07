# Manual de Usuario y Funcionalidades - Aplicación Móvil Eximp Frereg

Este documento detalla de manera exhaustiva el funcionamiento y las características de la aplicación móvil diseñada para la ferretería **Eximp Frereg**. 

La aplicación tiene como objetivo principal modernizar y acelerar el proceso de toma de pedidos por parte de los vendedores de campo, reemplazando el sistema manual tradicional y facilitando la posterior gestión logística, de facturación y despacho en almacén.

---

## 📌 Estructura General y Navegación

La aplicación cuenta con una barra de navegación inferior que permite acceder de manera rápida a sus 5 secciones principales:
1. **Clientes** 🤝: Gestión de la cartera de clientes.
2. **Productos** 📦: Visualización y administración del catálogo de productos.
3. **Pedidos** 🛒: Creación y edición de pedidos en curso (carrito de compras).
4. **NOTAS** 📝: Historial y estado de las Notas de Entrega/Pedido generadas.
5. **Total de ventas** 📈: Módulo de analíticas y reportes de ventas mensuales.

En la parte superior de las pantallas principales se incluye un encabezado común con acceso a un menú lateral (hamburguesa), el logo de **IPS**, el título de la pestaña actual, una barra de búsqueda rápida (lupa), opción de selección masiva y un botón para refrescar los datos de manera síncrona.

---

## 1. Módulo de Clientes 🤝

Permite a los vendedores gestionar y consultar los datos de contacto y facturación de todos los clientes de su zona de distribución.

### A. Lista de Clientes
* **Visualización:** Muestra una lista en scroll con los nombres comerciales y la dirección principal de cada cliente (ej. *Comercial Pasur*, *Distribuidora Muriel*, etc.).
* **Acciones rápidas por fila:**
  * 🗑️ **Icono de papelera:** Permite eliminar un cliente de la base de datos (requiere confirmación).
  * 📝 **Icono de lápiz:** Abre el formulario de edición de datos del cliente.
* **Búsqueda Dinámica (Lupa):** Al pulsar la lupa en la cabecera, el título se convierte en un campo de texto para buscar por coincidencia en nombres o direcciones (ej. al escribir "chapi", se filtran los clientes asociados a dicha zona). Se puede cancelar la búsqueda con el botón `X`.
* **Botón flotante (+):** Ubicado en la esquina inferior derecha, permite abrir el formulario para registrar un nuevo cliente.

### B. Formulario de Cliente (Agregar / Editar)
El formulario de datos consta de los siguientes campos:
* **NOMBRE_CLIENTE:** Razón social o nombre comercial del cliente.
* **RUC\*:** Registro Único de Contribuyentes (campo mandatorio de facturación).
* **DIRECCION:** Dirección fiscal o de entrega del establecimiento.
* **ENCARGADO:** Nombre del contacto o persona responsable del negocio.
* **TELEFONO:** Número telefónico de contacto.
* **Acciones:**
  * **Cancelar:** Descarta los cambios y vuelve a la lista.
  * **Hecho:** Guarda el registro en la base de datos (nuevo o modificado).

### C. Confirmación de Eliminación
* Al presionar el icono de eliminación, se despliega una ventana emergente de seguridad con el mensaje `Confirm - Are you sure?` para evitar pérdidas accidentales. Cuenta con los botones **NO** y **BORRAR**.

---

## 2. Módulo de Productos 📦

Este módulo funciona como el catálogo oficial de la ferretería, mostrando imágenes reales, marcas y precios vigentes.

### A. Catálogo en Cuadrícula
* **Visualización:** Presenta los productos en un diseño de dos columnas, cada una con la imagen de referencia del producto y su nombre/medida comercial (ej. *Universal IPS de 2½'*, *Tubo IPS de ¾'*, etc.).
* **Búsqueda Dinámica:** Permite filtrar rápidamente el catálogo ingresando términos clave (ej. "tubo" filtrará tuberías de agua, luz y herramientas como tijeras cortatubos).
* **Acciones:**
  * Al hacer clic sobre un producto, se abre la vista de **Detalle del Producto**.
  * **Botón flotante (+):** Abre el formulario de creación de nuevos productos.

### B. Ficha de Detalle del Producto
Muestra toda la información específica de un artículo:
* **Imagen ampliada** y nombre descriptivo.
* **Marca:** Fabricante del producto (ej. *IPS*, *Plastisur*).
* **Categoría:** Clasificación del producto (ej. *Tubos y accesorios*).
* **Unidad:** Tipo de empaque o unidad de medida (ej. *BOLSÓN*, *Caja*, *Unidad*).
* **Cantidad / Stock:** Control de existencias físicas.
* **Botones flotantes de acción rápida:**
  * 🌳 **Icono de árbol de jerarquía (verde superior):** Permite ver la clasificación o variantes estructuradas del producto.
  * 🔺 **Icono de pirámide de esferas (verde medio):** Accede a la configuración de paquetes o lotes del producto.
  * 📝 **Icono de lápiz (verde inferior):** Abre el formulario de edición.
* **Cabecera:** Cuenta con opción para eliminar el producto (papelera) y refrescar los datos.

### C. Formulario de Producto (Agregar / Editar)
Campos disponibles para configurar los artículos:
* **PRODUCTO\*:** Nombre completo y comercial del artículo (campo requerido).
* **MARCA:** Marca del fabricante.
* **UNIDAD:** Selección desplegable del tipo de unidad de medida.
* **PRECIO:** Costo unitario en Soles Peruanos (`S/`), ajustable manualmente o mediante los botones de incremento/decremento (`-` y `+`).
* **CATEGORIA:** Menú desplegable para asignar la clasificación logística.
* **Acciones:** **Cancelar** o **Hecho** para confirmar la operación.

---

## 3. Módulo de Pedidos (Carrito de Compras) 🛒

Es la zona de trabajo activa del vendedor de campo para armar el pedido final del cliente antes de enviarlo a almacén. Se divide en dos pestañas superiores:

### A. Pestaña "Artículos"
* Muestra la lista completa de artículos disponibles para la venta en formato de fila, con imagen, nombre y marca (ej. *Enchufe universal de colores - ABATRON*).
* Cuenta con un buscador rápido independiente en la cabecera (ej. al buscar "toma" muestra tomacorrientes y tomas coaxiales).
* **Icono de lista con flecha (derecha):** Al presionarlo se añade el producto directamente al carrito de compras.

### B. Pestaña "Carrito"
Muestra el resumen de los productos seleccionados para el pedido actual.
* **Cabecera del carrito:** Muestra la fecha del pedido y el importe acumulado en Soles (ej. `18/6/2026` | `42,50`).
* **Lista de ítems en carrito:** Muestra por cada artículo: nombre, precio unitario, cantidad agregada y un menú de acciones rápidas inferior:
  * 🗑️ **Papelera:** Elimina el ítem del carrito.
  * 📝 **Lápiz:** Abre el formulario para ajustar unidades y precio.
  * ➡️ **Flecha derecha:** Muestra la ficha detallada del producto.
  * 🛒📦 **Carrito con caja:** Permite proceder al procesamiento individual o validación logística del ítem.

### C. Formulario del Carrito (Ajustar Ítem)
* **ITEM:** Nombre del producto seleccionado (modo solo lectura).
* **UNIDADES:** Cantidad de unidades solicitadas, ajustable con los botones `-` y `+`.
* **PRECIO:** Permite aplicar descuentos o variaciones al precio unitario con los botones `-` y `+`.
* **TOTAL:** Muestra el cálculo automático y en tiempo real (Unidades × Precio).

### D. Formulario de Nota de Entrega (Procesamiento del Pedido)
Al finalizar la selección en el carrito, se abre la pantalla **NOTA Form** para formalizar el despacho:
* **TOTAL:** Suma total a pagar (solo lectura).
* **FACTURA:** Selección del tipo de comprobante requerido por el cliente:
  * **S/F:** Sin Factura (Nota de Entrega simple).
  * **C/F:** Con Factura.
  * **C/BV:** Con Boleta de Venta.
  * **Avisará:** Confirmación pendiente por el cliente más adelante.
* **RUC ó DNI:** Documento de identidad del cliente.
* **COMENTARIO:** Campo de texto libre para añadir indicaciones de entrega (ej. horario de atención, referencias de la fachada, prioridad).
* **METODO:** Desplegable para seleccionar el método de pago/transacción (ej. *Contado*, *Crédito*).

---

## 4. Módulo de Notas de Entrega 📝

Es el panel de control histórico y logístico. Aquí se guardan todas las Notas de Pedido procesadas para su seguimiento.

### A. Lista Histórica de Notas
* **Agrupación:** Organizado cronológicamente por fechas (ej. `24/8/2025`).
* **Información por Nota:** Muestra el cliente asignado (ej. *F. Adonai*), el monto total de la nota, la cantidad de productos incluidos y tres iconos de estado clave:
  * 🏠 **Icono de almacén/tienda:** Indica el estado de preparación y despacho de la mercadería en almacén.
  * 📋✔️ **Icono de documento con check:** Indica el estado de la facturación y comprobante.
  * 📄 **Icono de PDF:** Abre la vista del documento listo para imprimir o enviar digitalmente.
* **Filtros Avanzados (Botón en cabecera):** Despliega una barra lateral con múltiples filtros cruzados para buscar notas específicas por: *Nº Nota, Cliente, Teléfono del receptor, Fecha, Mes, Tipo de Factura, RUC/DNI, Comentarios, Método de pago o Archivo*.

### B. Vista de Detalle de la Nota
* Muestra el número de nota asignado (ej. `2`), cliente, dirección de entrega, **nombre de la persona que recibirá la mercadería**, **teléfono de contacto de quien recepciona**, fecha, mes de registro, total y comprobante.
* **Botones flotantes de acción:**
  * 📄📥 **Icono de PDF (verde superior):** Genera y descarga el documento oficial de pedido.
  * 📋✔️ **Icono de check (verde inferior):** Permite cambiar el estado de despacho/entrega o conformar la recepción del pedido.

### C. Documento Impreso: Nota de Pedido
El PDF generado automáticamente por la aplicación emite una estructura formal y limpia para distribución y almacén:
1. **Encabezado de la Empresa:** Datos fiscales de *EXIMP. FREREG E.I.R.L.*, teléfonos, sucursales y correo electrónico.
2. **Título Central:** "NOTA DE PEDIDO N° X" con identificación del Vendedor y Fecha.
3. **Datos del Cliente:** Espacios estructurados para RUC, Dirección, Teléfono, Condición de pago y tipo de Documento.
4. **Tabla de Contenido:** 
   * `UND`: Cantidad exacta solicitada.
   * `PRODUCTO`: Descripción y medidas del producto ferretero (ej. *Tubo agua de ¾" PLASTISUR*).
   * `PRECIO` y `TOTAL`: Costos de la transacción en Soles.
   * `CÓDIGO`: Código de barra o código interno del producto para fácil escaneo en almacén (ej. `*941471*`).
5. **Cierre:** Total final en Soles y campo de Comentarios adicionales.

---

## 5. Módulo de Ventas y Analíticas (Total de ventas) 📈

Herramienta diseñada para supervisar el rendimiento comercial mensual de los vendedores y la facturación global de la ferretería.

### A. Panel Gráfico
* **Gráfica de Barras Horizontal:** Muestra los meses del año (Enero a Diciembre) en el eje vertical y el monto facturado acumulado en Soles en el eje horizontal.
* Permite ver de un vistazo qué meses registran mayor volumen de ventas (ej. una barra verde alargada en *Septiembre* por el monto total de las notas generadas en ese mes).
* **Botón "Data" (Cabecera):** Permite pasar de la vista gráfica a la vista tabular de datos crudos.

### B. Vista Tabular (NOTA Inline)
* Muestra un reporte detallado con las transacciones individuales que alimentan la gráfica.
* **Columnas:** 
  * `FECHA`: Fecha exacta de la venta.
  * `TOTAL`: Monto total cobrado.
  * `METODO`: Método de pago asociado a la transacción (ej. *Contado*).
* Cuenta con buscador y filtros superiores.
