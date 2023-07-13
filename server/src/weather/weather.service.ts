import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import weatherApi from '../utils/weatherApi'

@Injectable()
export class WeatherService {
  private weathers = [
    {
      id: 1,
      city: 'London',
      wheather: 22.5,
    },
    {
      id: 2,
      city: 'New York',
      wheather: 15,
    },
    {
      id: 3,
      city: 'Miami',
      wheather: 30,
    },
  ]

  findAll() {
    return this.weathers
  }

  findById(id: number) {
    const weather = this.weathers[id - 1]
    if (!weather) throw new NotFoundException(`Weather with id ${id} not found`)
    return weather
  }

  async getCurrentWeather(location: string) {
    const weatherKey = process.env.WEATHER_API_KEY
    if (!weatherKey)
      throw new InternalServerErrorException('WEATJER_API_KEY is missing')

    const url = `/current.json?key=${weatherKey}&q=${location}`
    try {
      const { data } = await weatherApi.get(url)
      return data
    } catch (error) {
      throw new InternalServerErrorException('Internal server error', {
        cause: error,
      })
    }
  }
}
