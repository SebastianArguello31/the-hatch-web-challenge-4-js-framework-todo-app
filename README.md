# Mis tareas

Aplicación de tareas construida con un framework JavaScript propio.
Permite agregar tareas, marcarlas como completadas o pendientes, eliminarlas y consultar los contadores. Incluye filtros y persistencia local.

## Requisitos e instalación

Para reproducir el entorno de la guía puedes usar Node.js 22.12 o posterior dentro de la rama 22, con npm. Desde la raíz del repositorio:

```powershell
npm ci
npm run dev
```

Abre la dirección que muestre Vite. `npm ci` utiliza el `package-lock.json` incluido en el proyecto.

## Uso

Escribe un título y pulsa Enter o Agregar. Marca o desmarca la casilla paracambiar el estado de una tarea. 
El botón Eliminar actúa sobre su propia fila.

El selector permite ver Todas, Pendientes o Completadas. Los contadores siempre describen la lista completa. 
Al recargar la misma dirección serecuperan las tareas y la aplicación vuelve al filtro Todas.
 
## Tecnologías

JavaScript con módulos ES, JSX, HTML, CSS y `localStorage`.
Vite transforma JSX en llamadas a `createElement` del framework local.

## Estructura

```text
index.html                       Contenedor y entrada de la aplicación
src/main.jsx                     Montaje inicial y suscripción a la vista
src/App.jsx                      Composición, filtros y contadores
src/components/TaskForm.jsx      Entrada, validación y envío
src/components/TaskList.jsx      Lista visible y mensajes de lista vacía
src/components/TaskItem.jsx      Casilla y eliminación de una tarea
src/store/taskStore.js           Reducer, acciones, filtros y store
src/store/taskStorage.js         Lectura y escritura de las tareas
src/framework/mini-framework.js  Copia distribuible del framework
src/styles.css                   Estilos y adaptación a pantallas estrechas
tests/taskStore.test.js          Pruebas de reglas de negocio e integración
```

## Gestión de estado

Cada tarea tiene `id`, `title` y `completed`. Los componentes comunican las operaciones mediante acciones. El reducer calcula el siguiente estado, el store avisa a la vista y el framework actualiza el DOM.

El `id` identifica a cada tarea aunque dos compartan título. La vista calcula los contadores desde el array completo y entrega a la lista solo
las filas del filtro seleccionado.

## Integración del framework

- Proyecto de origen: `the-hatch-web-challenge-4-build-your-own-js-framework`.
- Archivo original: `src/mini-framework.js`.
- Copia local: `src/framework/mini-framework.js`.
- SHA-256 de la copia integrada: `FD4FEA51B5F87522250F238E2C1CA1CCA1535193A485ED2011DDD852DED7CA0A`.

La aplicación importa `createElement`, `render` y `createStore` desde la copia local. Para actualizarla, valida primero la revisión del repositorio del framework, copia su archivo distribuible y vuelve a ejecutar las pruebas.

## Pruebas y compilación

```powershell
npm test
npm run build
npm run preview
```

`npm test` comprueba las reglas de tareas, los filtros y las notificaciones del store. En la dirección de vista previa, comprueba también el envío con Enter, la navegación por teclado y la recuperación de tareas al recargar.

## Persistencia y límites

Las tareas y el próximo identificador se guardan bajo la clave `ch4.todo.v1` del navegador. Los datos pertenecen al origen de la página y al perfil del navegador. Una dirección con otro puerto utiliza otro almacenamiento.

Una recarga restablece la ayuda y el filtro. Si el navegador impide guardar, la aplicación permite continuar en memoria y registra la incidencia en consola.

La aplicación está pensada para uso individual en un navegador. Una posible mejora futura es sincronizar los cambios entre pestañas abiertas.