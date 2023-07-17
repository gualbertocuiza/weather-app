<script lang="ts" setup>
import { Weather } from '../interfaces/Weather'
const props = defineProps<{ weather: Weather }>()
const location = props.weather.location
const current = props.weather.current
</script>

<template>
  <div class="w-96">
    <div class="card w-auto shadow-xl">
      <div class="card-body">
        <h1 class="text-3xl">
          {{ location.name }},
          {{ location.country }}
        </h1>
        <small>{{ location.localtime }} - {{ current.condition.text }}</small>
        <div class="weahter flex justify-between">
          <h1>{{ current.temp_c }}°C</h1>
          <img
            :src="current.condition.icon"
            :alt="current.condition.text"
            width="90"
            height="90"
          />
        </div>
        <div class="divider"></div>
        <div class="text-sm tracking-wide text-gray-500">
          <div class="flex justify-between mb-2">
            <span>Windy</span>
            <span>{{ current.wind_kph }} km/h</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Windy Dir</span>
            <span>{{ current.wind_dir }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Humidity</span>
            <span>{{ current.humidity }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>cloud</span>
            <span>{{ current.cloud }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Feels like</span>
            <span>{{ current.feelslike_c }}°C</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="card-actions justify-end">
          <button class="btn btn-neutral btn-sm">Full report</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weahter h1 {
  font-size: 4em;
  color: gray;
}
</style>
