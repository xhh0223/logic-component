import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import viteCDNPlugin from 'vite-plugin-cdn-import'
// import { createHtmlPlugin } from 'vite-plugin-html'
import viteImagemin from 'vite-plugin-imagemin'
const PageDir = path.resolve(__dirname)
// import externalGlobals from 'rollup-plugin-external-globals'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

export default defineConfig({
  root: path.resolve(PageDir, 'src'),
  publicDir: path.resolve(PageDir, 'public'),
  base: '/',
  plugins: [
    react(),
    visualizer({
      open: false,
    }),
    viteCDNPlugin({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: 'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js',
        },
        {
          name: 'react-dom',
          var: 'ReactDom',
          alias: ['react-dom/client'],
          path: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js',
        },
        // {
        //   name: 'react-markdown',
        //   var: 'ReactMarkdown',
        //   path: 'https://esm.sh/react-markdown@9?bundle',
        // },
      ],
    }),
    viteImagemin({
      gifsicle: {
        // gif图片压缩
        optimizationLevel: 3, // 选择1到3之间的优化级别
        interlaced: false, // 隔行扫描gif进行渐进式渲染
        // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
      },
      optipng: {
        // png
        optimizationLevel: 7, // 选择0到7之间的优化级别
      },
      mozjpeg: {
        // jpeg
        quality: 20, // 压缩质量，范围从0(最差)到100(最佳)。
      },
      pngquant: {
        // png
        quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
        speed: 4, // 压缩速度，1(强力)到11(最快)
      },
      svgo: {
        // svg压缩
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    chunkSplitPlugin({
      strategy: 'single-vendor',
      customSplitting: {
        'markdown-vendor': ['react-markdown', 'rehype-raw', 'remark-gfm'],
        'react-codemirror-vendor': [
          '@codemirror/lang-javascript',
          '@uiw/codemirror-theme-okaidia',
          '@uiw/react-codemirror',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@style': path.resolve(__dirname, 'src', 'style'),
      'react-logic-component': path.resolve(__dirname, '..', 'component', 'src'),
    },
  },
  preview: {
    port: '8000',
  },
  build: {
    sourcemap: 'inline',
    esbuild: {
      drop: ['console', 'debugger'],
    },
    outDir: path.resolve(__dirname, '../', '../', 'docs'),
    emptyOutDir: true,
    rollupOptions: {
      treeshake: true,
      external: ['react', 'react-dom'],
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
    },
  },
})
