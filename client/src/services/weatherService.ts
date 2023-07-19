import weatherApi from '../api/weatherApi'
import { Weather } from '../interfaces/Weather'

export const getCurrentWeather = async (loc: string) => {
  return await weatherApi.get<Weather>(`weather?location=${loc}`)
}
