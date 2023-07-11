import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { WeatherService } from './weather.service'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather() {
    return this.weatherService.findAll()
  }

  @Get(':id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.weatherService.findById(id)
  }
}
