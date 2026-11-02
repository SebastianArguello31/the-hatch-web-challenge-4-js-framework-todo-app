import { defineConfig } from "vite";

const jsx = { runtime: "classic", pragma: "createElement" };

export default defineConfig({
    // El transformador convierte el JSX en llamadas a createElement, importada desde nuestro framework.
    oxc: { jsx },

    // El escáner de dependencias de Vite también necesita el modo clásico.
    optimizeDeps: {
        rolldownOptions: { transform: { jsx } }
    }
});