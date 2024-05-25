import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig((command, mode, isSsrBuild, isPreview) => {
  /** @type {import('vite').UserConfig} */
  const config = {
    mode: 'production',
    plugins: [react(), dts()],
    define: {
      __APP_ENV__: loadEnv(mode, __dirname, ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    appType: 'custom',
    build: {
      outDir: path.resolve(__dirname, 'dist', 'lib'),
      minify: false,
      lib: {
        fileName: 'index',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
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
