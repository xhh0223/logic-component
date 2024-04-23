import { build } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const root = process.cwd();
build({
  build: {
    minify: false,
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          vue: "react",
        },
        dir: path.resolve(root, "dist"),
      },
    },
    lib: {
      entry: path.resolve(root, "src", "index.ts"),
      name: "logic-component",
      fileName: "logic-component",
      formats: ["es", "umd", "cjs"],
    },
  },
  plugins: [react()],
});
