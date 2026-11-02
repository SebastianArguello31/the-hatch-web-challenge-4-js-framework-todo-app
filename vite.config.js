import { defineConfig } from "vite";

export default defineConfig({
    // El transformador convierte el JSX en llamadas a createElement, importada desde nuestro framework.
    oxc: {
        jsx: {
            runtime: "classic",
            pragma: "createElement"
        }
    }
});