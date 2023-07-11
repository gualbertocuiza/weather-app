import { Injectable, NotFoundException } from '@nestjs/common'

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
}
