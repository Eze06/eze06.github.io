import { defineConfig } from "vite";
import { resolve } from "path";

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
    root,
    base: "/Portfolio/",
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(root, "index.html"),
                cardiva: resolve(root, 'cardiva', 'index.html'),
                engarde: resolve(root, 'engarde', 'index.html'),
                konranbou: resolve(root, 'konranbou', 'index.html'),
                pryze: resolve(root, 'pryze', 'index.html'),
                requiem: resolve(root, 'requiem', 'index.html'),
                verdant: resolve(root, 'verdant', 'index.html'),
                solarsystem: resolve(root, 'solarsystem', 'index.html'),
                xpofolio: resolve(root, 'xpofolio', 'index.html'),
            },
        },
    },
});