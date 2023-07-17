import weatherApi from '../api/weatherApi'
import { Weather } from '../interfaces/Weather'

export const getCurrentWeather = async (loc: string) => {
  try {
    const { data } = await weatherApi.get<Weather>(`weather?location=${loc}`)
    return data
  } catch (error) {
    console.log(error)
    //TO-DO
  }
}
