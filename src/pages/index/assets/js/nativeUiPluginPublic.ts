import {
  create,
  NConfigProvider,
  NNotificationProvider,
  NButton
} from 'naive-ui'

const naive = create({
  components: [
    NConfigProvider,
    NNotificationProvider,
    NButton
  ]
})

export default naive