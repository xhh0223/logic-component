import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

const PageDir = path.resolve(__dirname)
export default defineConfig({
  root: path.resolve(PageDir, 'src'),
  publicDir: path.resolve(PageDir, 'public'),
  base: '/logic-component/',
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@style': path.resolve(__dirname, 'src', 'style'),
      '~logic-component': path.resolve(__dirname, '..', 'component', 'src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom', 'remark-gfm'],
    },
    outDir: path.resolve(__dirname, 'dist'),
  },
})
