import { Weather } from '../interfaces/Weather'
import { getCurrentWeather } from '../services/weatherService'
import errorHandler from '../utils/errorHandler'
import { onMounted, ref } from 'vue'

interface storageWeather {
  data: {
    [city: string]: Weather
  }
}

const loading = ref<boolean>(false)
const currentWeather = ref<Weather>()
const storageWeathers = ref<storageWeather>({ data: {} })

export const useWeather = () => {
  onMounted(() => {
    getStoragedWeathers()
  })

  const getStoragedWeathers = () => {
    let weather = localStorage.getItem('cities')
    if (weather) {
      let data = JSON.parse(weather)
      storageWeathers.value = data
    }
  }

  const setCity = async (city: string) => {
    loading.value = true
    let current = storageWeathers.value.data[getCityKey(city)]
    if (current) {
      currentWeather.value = current
      loading.value = false
      return
    }
    return requestWeather(city)
  }

  const requestWeather = async (city: string) => {
    try {
      const { data } = await getCurrentWeather(city)
      if (data) {
        currentWeather.value = data
        storeWeatherCity(city, data)
      }
    } catch (error) {
      console.log(error)
      errorHandler(error)
    } finally {
      loading.value = false
    }
  }

  const storeWeatherCity = (city: string, data: Weather) => {
    storageWeathers.value.data[getCityKey(city)] = data
    localStorage.setItem('cities', JSON.stringify(storageWeathers.value))
  }

  const getCityKey = (city: string) => {
    return city.replace(',', '').replaceAll(' ', '-')
  }

  return {
    loading,
    currentWeather,
    setCity,
    storageWeathers,
  }
}
