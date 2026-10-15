
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
    root: "./src",

    base: process.env.NODE_ENV === "production"
        ? `/${path.basename(process.cwd())}/`
        : "./",

    server: {
        port: 5173
    },

    build: {
        outDir: "../dist",
        emptyOutDir: true
    }
});
