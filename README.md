# Mis tareas

Aplicación educativa de gestión de tareas construida con el framework
propio del challenge. En la etapa 9, la pantalla inicial permite comprobar
la integración mostrando y ocultando una ayuda.

## Ejecutar

Desde la raíz del proyecto, con Node.js compatible con Vite 8 y npm:

```powershell
npm ci
npm run dev
```

En la primera instalación, si aún se está preparando el proyecto y falta
`package-lock.json`, utiliza `npm install`. Abre la dirección que indique Vite.

## Compilar

```powershell
npm run build
npm run preview
```

## Framework utilizado

- Proyecto de origen: `the-hatch-web-challenge-4-build-your-own-js-framework`.
- Archivo de origen: `src/mini-framework.js`.
- Copia utilizada por la aplicación: `src/framework/mini-framework.js`.
- SHA-256 de la copia: `PENDIENTE_DE_REGISTRAR`.

Antes de registrar la integración, sustituye el marcador por el SHA-256
obtenido al comparar el archivo de origen y la copia.

## Verificar la integración

Abre la aplicación y pulsa «Mostrar ayuda». Deben aparecer el texto de ayuda
y el botón «Ocultar ayuda». Vuelve a pulsar el botón para cerrar la ayuda.
También puedes recorrer la página con Tab y activar el botón con Enter.

El evento despacha una acción al store. La suscripción vuelve a ejecutar
la vista con el estado actualizado.