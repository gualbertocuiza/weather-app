import { Injectable } from '@nestjs/common'

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

  findById(id) {
    return this.weathers[id - 1]
  }
}
