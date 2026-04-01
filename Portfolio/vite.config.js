import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/Portfolio/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                cardiva: resolve(__dirname, "projects/cardiva.html"),
                engarde: resolve(__dirname, "projects/engarde.html"),
                konranbou: resolve(__dirname, "projects/konranbou.html"),
                pryze: resolve(__dirname, "projects/pryze.html"),
                requiem: resolve(__dirname, "projects/requiem.html"),
                verdant: resolve(__dirname, "projects/verdant.html"),
                solarsystem: resolve(__dirname, "projects/solar-system.html"),
                xpofolio: resolve(__dirname, "projects/xpofolio.html"),
            },
        },
    },
});