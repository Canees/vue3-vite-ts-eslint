import { defineStore } from 'pinia'
// id必填，且需要唯一
import { ref } from 'vue'
const useStore = defineStore('index', () => {
  const loading = ref(false)

  const setLoading = (data:boolean) => {
    loading.value = data
  }
  return { loading, setLoading }
})
export default useStore
