import { reactive } from 'vue'

type alertType = 'error' | 'warning' | 'success' | 'info'

const alertStore = reactive({
  show: false,
  type: '',
  message: '',

  setAlert(msj: string, type: alertType = 'error') {
    this.show = true
    this.type = type
    this.message = msj
    setTimeout(() => this.resetAlert(), 3000)
  },

  resetAlert() {
    this.show = false
    this.type = ''
    this.message = ''
  },
})

export default alertStore
