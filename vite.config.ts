import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src") // THIS tells Vite @ === /src
        }
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000", // Vercel dev functions
                changeOrigin: true
            }
        }
    }
});