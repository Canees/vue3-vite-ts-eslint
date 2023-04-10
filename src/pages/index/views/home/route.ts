import { RouteRecordRaw } from 'vue-router'
import home from './index.vue'

export default {
  path: '/',
  meta: {
    authorize: true
  },
  component: home
} as RouteRecordRaw