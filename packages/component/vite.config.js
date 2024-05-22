import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig((command, mode, isSsrBuild, isPreview) => {
  /** @type {import('vite').UserConfig} */
  const config = {
    mode: 'production',
    plugins: [react(), dts()],
    define: {
      __APP_ENV__: loadEnv(mode, process.cwd(), ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    appType: 'custom',
    build: {
      outDir: path.resolve(process.cwd(), 'dist', 'lib'),
      minify: false,
      lib: {
        fileName: 'index',
        entry: path.resolve(process.cwd(), 'src', 'index.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        external: ['react'],
        // output: {
        //   format: "es",
        //   // preserveModules: true,
        //   // entryFileNames: "[name].js",
        // },
      },
    },
  }
  return config
})
