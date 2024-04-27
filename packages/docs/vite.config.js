import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";
import path from "path";

const PageDir = path.resolve(process.cwd(), "src");

export default defineConfig({
  root: PageDir,
  plugins: [
    react(),
    inject({
      jQuery: "jquery",
    }),
  ],
  resolve: {
    alias: {
      "@src": path.resolve(process.cwd(), "src"),
      "@style": path.resolve(process.cwd(), "src", "style"),
      "@logic-component": path.resolve(process.cwd(), "..", "component", "src"),
      "@/utils": path.resolve(process.cwd(), "..", "component", "src", "utils"),
    },
  },
  build: {
    outDir: path.resolve(process.cwd(), "dist"),
  },
});
