import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import naive from './assets/js/nativeUiPluginPublic'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import '@/utils/rem'
// 动态路由
const routes = Object.values(import.meta.glob('./views/*/route.ts', { eager: true, import: 'default' })) as unknown as RouteRecordRaw[]
routes.push({ path: '/:path(.*)', redirect: '/' })
const store = createPinia()
const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由守卫
// router.beforeEach((to, from, next) => {
//   // do something
//   next()
// })
app.use(store)
  .use(naive)
  .use(router)
  .mount('#app')
