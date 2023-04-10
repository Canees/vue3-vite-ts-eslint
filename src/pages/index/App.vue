<template>
  <loading v-if="show" />
  <n-config-provider
    preflight-style-disabled
    inline-theme-disabled
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-notification-provider>
      <router-view />
    </n-notification-provider>
  </n-config-provider>
</template>
<script setup lang='ts'>
import loading from '@/components/loading.vue'
import useStore from './store/index'
import { computed } from 'vue'
import { zhCN, dateZhCN } from 'naive-ui'
import Theme from '../../assets/naiveTheme.json'

const store = useStore()
const show = computed(() => store.loading)
const themeOverrides = Theme
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>