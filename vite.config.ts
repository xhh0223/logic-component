import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer'
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
    rollupOptions: {
      // external: ['react'],
      output: {
        chunkFileNames: '[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'index.js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      }
    }
  },
});
