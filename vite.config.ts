import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  publicDir: "static",
  build: {
    target:'esnext',
    lib: {
      entry: path.resolve(__dirname, "src", "components"),
      // name: "logicComponent"
      formats: ['es'],
    },
    outDir: 'lib',
    minify: false,
    rollupOptions: {
      plugins: [react(), /* visualizer({ open: true } ),*/],
      external: ['react'],
      output: {
        globals: {
          react: "React"
        },
        manualChunks(id) {
          if (id.includes("component")) {
            console.log(id)
          }
        },
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js"
      },
    }
  },
  // esbuild: {
  //   jsx: 'transform',
  //   jsxFragment: 'Fragment',
  //   loader: 'jsx',
  // }
});
