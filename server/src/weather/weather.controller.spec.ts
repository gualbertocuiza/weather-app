import { Test, TestingModule } from '@nestjs/testing'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { WEATHER_API_URL } from '../utils/constants'

const server = setupServer(
  rest.get(`${WEATHER_API_URL}/current.json`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(weather))
  }),
)

describe('WeatherController', () => {
  let weatherController: WeatherController

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  afterAll(() => server.close())

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile()

    weatherController = app.get<WeatherController>(WeatherController)
  })

  describe('root', () => {
    it('should return a weather object of the city sent', async () => {
      const res = await weatherController.getWeather('Cocha')
      expect(res).toStrictEqual(weather)
    })
  })
})

const weather = {
  location: {
    name: 'Cochabamba',
    region: 'Cochabamba',
    country: 'Bolivia',
    lat: -17.38,
    lon: -66.15,
    tz_id: 'America/La_Paz',
    localtime_epoch: 1689777381,
    localtime: '2023-07-19 10:36',
  },
  current: {
    last_updated_epoch: 1689777000,
    last_updated: '2023-07-19 10:30',
    temp_c: 17,
    temp_f: 62.6,
    is_day: 1,
    condition: {
      text: 'Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      code: 1000,
    },
    wind_mph: 3.8,
    wind_kph: 6.1,
    wind_degree: 250,
    wind_dir: 'WSW',
    pressure_mb: 1030,
    pressure_in: 30.42,
    precip_mm: 0,
    precip_in: 0,
    humidity: 34,
    cloud: 0,
    feelslike_c: 17,
    feelslike_f: 62.6,
    vis_km: 10,
    vis_miles: 6,
    uv: 4,
    gust_mph: 0.4,
    gust_kph: 0.7,
  },
}
