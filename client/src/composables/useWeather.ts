import { Weather } from '../interfaces/Weather'
import { getCurrentWeather } from '../services/weatherService'
import errorHandler from '../utils/errorHandler'
import { ref } from 'vue'

const loading = ref<boolean>(false)
const currentWeather = ref<Weather>()

export const useWeather = () => {
  const setCity = async (city: string) => {
    loading.value = true
    try {
      const { data } = await getCurrentWeather(city)
      currentWeather.value = data
    } catch (error) {
      console.log(error)
      errorHandler(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    currentWeather,
    setCity,
  }
}
