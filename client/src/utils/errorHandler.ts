import alertStore from '../store/alert'
import axios from 'axios'

const errorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.statusText
    switch (error.response?.status) {
      case 500:
        alertStore.setAlert(message ?? 'Error: Internal server error')
        break
      case 404:
        alertStore.setAlert(message ?? 'Error: Resource not found')
        break
      default:
        alertStore.setAlert('Something went wrong. Please try again later!')
        break
    }
  } else {
    alertStore.setAlert('Something went wrong. Please try again later!')
  }
}

export default errorHandler
