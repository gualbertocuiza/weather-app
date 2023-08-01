import axios from 'axios'
import { WEATHER_API_URL } from './constants'

const instance = axios.create({
  baseURL: WEATHER_API_URL,
})

export default instance
