import alertStore from '../store/alert'
import axios from 'axios'

const errorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 500:
        alertStore.setAlert('Error: Internal server error')
        break
      case 404:
        alertStore.setAlert('Error: Resource not found')
        break
      default:
        alertStore.setAlert('Something went wrong. Please try again later!')
        break
    }
  }
  alertStore.setAlert('Something went wrong. Please try again later!')
}

export default errorHandler
