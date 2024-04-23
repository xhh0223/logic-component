import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig((command, mode, isSsrBuild, isPreview) => {
  /** @type {import('vite').UserConfig} */
  const config = {
    mode: "production",
    plugins: [react()],
    define: {
      __APP_ENV__: loadEnv(mode, process.cwd(), ""),
    },
    appType: "custom",
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
      },
    },
    build: {
      lib: {
        entry: path.resolve(process.cwd(), "src/index.ts"),
        formats: ["es"],
      },
      minify: false,
      outDir: path.resolve(process.cwd(), "dist"),
      // rollupOptions: {
      //   // 确保外部化处理那些你不想打包进库的依赖
      //   external: ["vue"],
      //   output: {
      //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //     globals: {
      //       vue: "Vue",
      //     },
      //   },
      // },
    },
  };
  return config;
});
