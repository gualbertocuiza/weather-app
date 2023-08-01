import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { defineComponent } from 'vue'
import { useWeather } from '../useWeather'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('http://localhost:3000/weather', (req, res, ctx) => {
    console.log(req)
    return res(ctx.status(200), ctx.json(weather))
  })
)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => {
  server.close()
  localStorage.clear()
})

describe('weather card component', () => {
  const testComponent = defineComponent({
    setup() {
      const { loading, setCity, storageWeathers } = useWeather()
      return { loading, setCity, storageWeathers }
    },
  })
  const wrapper = mount(testComponent)

  it('should not exists any weather data after mounted, neather in the properties nor in LocalStorage', () => {
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.storageWeathers.data).toEqual({})
    let data = localStorage.getItem('cities')
    if (data) data = JSON.parse(data)
    expect(data).toBeNull()
  })

  it('should request /weather?loc when a city is setted', async () => {
    await wrapper.vm.setCity('Santa Cruz, Bolivia')
    expect(wrapper.vm.storageWeathers.data).toStrictEqual({
      'Santa-Cruz-Bolivia': weather,
    })
  })

  it('should have been store in LocalSotare after the http request', () => {
    let data = localStorage.getItem('cities')
    if (data) data = JSON.parse(data).data
    expect(data).toStrictEqual({
      'Santa-Cruz-Bolivia': weather,
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
