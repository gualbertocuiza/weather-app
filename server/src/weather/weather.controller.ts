import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { WeatherService } from './weather.service'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query('location') location: string) {
    if (!location) throw new BadRequestException('location query is required')
    return this.weatherService.getCurrentWeather(location)
  }

  @Get(':id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.weatherService.findById(id)
  }
}
