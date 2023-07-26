import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import WeatherCard from '../weatherCard.vue'

describe('weather card component', () => {
  const { location, current } = weather
  const wrapper = mount(WeatherCard, {
    props: {
      weather: weather,
    },
  })

  it('should display the city, country', () => {
    expect(wrapper.find('h1').text()).toContain(
      `${location.name}, ${location.country}`
    )
  })

  it('should display the temperature in degrees Celsius by default', () => {
    expect(wrapper.find('#temp').text()).toContain(`${current.temp_c}°C`)
  })

  it('should switch between celcious and fahrenheit with toggle input', async () => {
    const temp = wrapper.find('#temp')
    const feelsLike = wrapper.find('#feels-like')

    expect(temp.text()).toContain(`${current.temp_c}°C`)
    expect(feelsLike.text()).toContain(`${current.feelslike_c}°C`)

    await wrapper.find('input').setValue(true)

    expect(temp.text()).toContain(`${current.temp_f}°F`)
    expect(feelsLike.text()).toContain(`${current.feelslike_f}°F`)
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
