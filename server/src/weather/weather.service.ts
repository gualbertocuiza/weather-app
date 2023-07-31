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

  private setUrlQueries(location: string) {
    const weatherKey =
      process.env.NODE_ENV === 'test'
        ? 'api-key-123'
        : process.env.WEATHER_API_KEY
    if (!weatherKey)
      throw new InternalServerErrorException('WEATHER_API_KEY is missing')

    return `/current.json?key=${weatherKey}&q=${location}`
  }

  async getCurrentWeather(location: string) {
    const url = this.setUrlQueries(location)
    const { data } = await weatherApi.get(url)
    return data
  }
}
