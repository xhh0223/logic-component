import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    test: 1,
    test2: 3
  },
  publicDir: "static",
  build: {
    lib: {
      entry:'',
      name: "2",
    },
  },
});
