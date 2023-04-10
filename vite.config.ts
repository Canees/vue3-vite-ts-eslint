/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: './',
    resolve: {
      alias: {
        /*
          路径别名
          若为文件系统路径必须是绝对路径的形式，否则将以别名原样呈现，不会解析为文件系统路径路径
        */
        '@': resolve(__dirname, './src')
      }
    },
    plugins: [ vue(), viteCompression(), eslint({ fix: true, include: [ '**/*.ts', '**/*.vue' ] }) ],
    server: {
      host: '0.0.0.0',
      port: 5888,
      open: true,
      strictPort: false,
      https: false,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
          headers: {
            Referer: 'https://example.com'
          }
        }
      }
    },
    esbuild: {
      drop: [ 'console', 'debugger' ] // build 移除打印
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
          login: resolve(__dirname, 'login.html')
        },
        output: { // 静态资源分类打包
          chunkFileNames: 'js/[hash].js',
          entryFileNames: 'js/[hash].js',
          assetFileNames: 'assets/[ext]/[hash].[ext]',
          // 拆分node_modules包
          manualChunks: (id: any) => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
            return ''
          }
        }
      }
    },
    define: {
      __VUE_OPTIONS_API__: false
    }
  })
}
