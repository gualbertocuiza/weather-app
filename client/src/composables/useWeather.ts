import { Weather } from '../interfaces/Weather'
import { getCurrentWeather } from '../services/weatherService'
import errorHandler from '../utils/errorHandler'
import { onMounted, ref } from 'vue'

interface storageWeather {
  data: {
    [city: string]: Weather
  }
  updated_at: Date
}

const loading = ref<boolean>(false)
const currentWeather = ref<Weather>()
const storageWeathers = ref<storageWeather>({
  data: {},
  updated_at: new Date(),
})

export const useWeather = () => {
  onMounted(() => {
    getStoragedWeathers()
  })

  const getStoragedWeathers = () => {
    let weather = localStorage.getItem('cities')
    if (weather) {
      let data = JSON.parse(weather)
      storageWeathers.value = data
      if (
        new Date(storageWeathers.value.updated_at).getDay() !=
        new Date().getDay()
      ) {
        updateWeatherData()
      }
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
    storageWeathers.value.updated_at = new Date()
    localStorage.setItem('cities', JSON.stringify(storageWeathers.value))
  }

  const getCityKey = (city: string) => {
    return city.replace(',', '').replaceAll(' ', '-')
  }

  const updateWeatherData = () => {
    const { data } = storageWeathers.value
    for (const key in data) {
      requestWeather(key.replaceAll('-', ' '))
    }
  }

  return {
    loading,
    currentWeather,
    setCity,
    storageWeathers,
  }
}
