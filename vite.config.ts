import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer'
import dts from 'rollup-plugin-dts'
export default defineConfig({
  plugins: [react(), visualizer(/* { open: true } */)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  publicDir: "static",
  build: {
    lib: {
      formats: ['es'],
      entry: {
        component: path.resolve(__dirname, "src", "components")
      },
    },
    outDir: 'lib',
    minify: false,
    rollupOptions: {
      external: ['react'],
    }
  },
});
