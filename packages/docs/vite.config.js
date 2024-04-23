import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
console.log(path.resolve(process.cwd(), "..", "component", "src"));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@component": path.resolve(process.cwd(), "..", "component", "src"),
      "@/utils": path.resolve(process.cwd(), "..", "component", "src", "utils"),
    },
  },
});
