import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { WeatherService } from './weather.service'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('location') location: string) {
    if (!location) throw new BadRequestException('location query is required')
    try {
      return await this.weatherService.getCurrentWeather(location)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Internal server error', {
        cause: error,
      })
    }
  }

  @Get(':id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.weatherService.findById(id)
  }
}
