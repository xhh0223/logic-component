import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(() => {
  /** @type {import('vite').UserConfig} */
  const config = {
    mode: 'dev',
    plugins: [
      react(),
      dts({
        outDir: path.resolve(__dirname, '../', '../', 'dist'),
      }),
    ],
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
      emptyOutDir: true,
      minify: false,
      lib: {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        formats: ['es'],
      },
      outDir: path.resolve(__dirname, '../', '../', 'dist'),
      rollupOptions: {
        external: ['react'],
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].js',
        },
      },
    },
  }
  return config
})
