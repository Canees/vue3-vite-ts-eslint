import { RouteRecordRaw } from 'vue-router'

export default {
  path: '/test',
  meta: {
    authorize: true
  },
  component: () => import('./index.vue' as any),
  children: []
} as RouteRecordRaw