import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      include: ["buffer", "process"],
    }),
  ],
  base: "./", // static files will be served from the root
  define: {
    "process.env": {},
    global: {},
  },
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
});
