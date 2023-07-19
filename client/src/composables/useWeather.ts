import { Weather } from '../interfaces/Weather'
import { getCurrentWeather } from '../services/weatherService'
import errorHandler from '../utils/errorHandler'
import { ref } from 'vue'

const loading = ref<boolean>(false)
const currentWeather = ref<Weather>({
  location: {
    name: 'Cochabamba',
    region: 'Cochabamba',
    country: 'Bolivia',
    lat: -17.38,
    lon: -66.15,
    tz_id: 'America/La_Paz',
    localtime_epoch: 1689775233,
    localtime: '2023-07-19 10:00',
  },
  current: {
    last_updated_epoch: 1689775200,
    last_updated: '2023-07-19 10:00',
    temp_c: 15.0,
    temp_f: 59.0,
    is_day: 1,
    condition: {
      text: 'Soleado',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      code: 1000,
    },
    wind_mph: 3.8,
    wind_kph: 6.1,
    wind_degree: 340,
    wind_dir: 'NNW',
    pressure_mb: 1030.0,
    pressure_in: 30.42,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 48,
    cloud: 0,
    feelslike_c: 15.8,
    feelslike_f: 60.4,
    vis_km: 10.0,
    vis_miles: 6.0,
    uv: 4.0,
    gust_mph: 0.4,
    gust_kph: 0.7,
  },
})

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
