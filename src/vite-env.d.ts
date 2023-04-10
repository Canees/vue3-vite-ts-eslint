/// <reference types="vite/client" />

/** 代指任意类型 请不要随意使用 */
// eslint-disable-next-line no-unused-vars
declare type Any = any

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'js-md5'
declare module 'xlsx'
declare module 'html2canvas'
declare module 'jspdf'
declare module '@/utils/*'
