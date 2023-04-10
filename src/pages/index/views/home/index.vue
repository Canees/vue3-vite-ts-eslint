<script setup lang="ts">
import { POST } from '@/utils/request'

function change() {
  POST('/sys/login', { userAccount: 1, userPwd: 'c4ca4238a0b923820dcc509a6f75849b' })
}
</script>
<template>
  <div>
    <n-button
      type="primary"
      @click="change"
    >
      我不是全局组件
    </n-button>
  </div>
</template>
