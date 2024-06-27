import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

const PageDir = path.resolve(__dirname, 'src')

export default defineConfig({
  root: PageDir,
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
    outDir: path.resolve(__dirname, 'dist'),
  },
})
