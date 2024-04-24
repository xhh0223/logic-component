import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { readdirSync } from "fs";

const PageDir = path.resolve(process.cwd(), "src", "page");
const Router = (() => {
  return readdirSync(PageDir).map((i) =>
    path.resolve(PageDir, i, "index.html")
  );
})();

export default defineConfig({
  root: PageDir,
  plugins: [react()],
  resolve: {
    alias: {
      "@component": path.resolve(process.cwd(), "..", "component", "src"),
      "@/utils": path.resolve(process.cwd(), "..", "component", "src", "utils"),
    },
  },
  build: {
    rollupOptions: {
      input: Router,
    },
    outDir: path.resolve(process.cwd(), "dist"),
  },
});
