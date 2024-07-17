import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
const PageDir = path.resolve(__dirname)
export default defineConfig({
  root: path.resolve(PageDir, 'src'),
  publicDir: path.resolve(PageDir, 'public'),
  base: '/logic-component/',
  plugins: [
    react(),
    visualizer({
      // 打包完成后自动打开浏览器，显示产物体积报告
      open: true,
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@style': path.resolve(__dirname, 'src', 'style'),
      '~react-logic-component': path.resolve(__dirname, '..', 'component', 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules/.test(id)) {
            if (id.includes('refractor@3.6.0/node_modules/refractor')) {
              return 'refractor@3.6.0'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
