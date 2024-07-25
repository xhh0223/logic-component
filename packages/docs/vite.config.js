import react from '@vitejs/plugin-react'
import { exec } from 'child_process'
import path from 'path'
import externalGlobals from 'rollup-plugin-external-globals'
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
      open: false,
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@style': path.resolve(__dirname, 'src', 'style'),
      'react-logic-component': path.resolve(__dirname, '..', 'component', 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      plugins: [
        externalGlobals({
          react: 'React',
        }),
      ],
      external: [
        // https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
        'react',
        // https://esm.sh/react-markdown@9?bundle
        'react-markdown',
        // https://esm.sh/rehype-raw@7?bundle
        'rehype-raw',
        // https://esm.sh/remark-gfm@4?bundle
        'remark-gfm',
      ],
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 让每个插件都打包成独立的文件
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
})
