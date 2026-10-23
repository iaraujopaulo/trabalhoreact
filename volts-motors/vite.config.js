import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" deixa os caminhos relativos, então o site funciona em qualquer pasta (ex.: GitHub Pages)
export default defineConfig({
  base: "./",
  plugins: [react()],
});
