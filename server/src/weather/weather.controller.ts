import { Controller, Get, Param } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
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
  ];

  @Get()
  getWeather() {
    return this.weathers;
  }

  @Get(':id')
  getByID(@Param('id') id) {
    return this.weathers[id - 1];
  }
}
