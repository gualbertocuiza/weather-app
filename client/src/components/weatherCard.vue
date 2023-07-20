<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Weather } from '../interfaces/Weather'
const props = defineProps<{ weather: Weather }>()
const { location, current } = props.weather
const degCelsius = ref<boolean>(true)
const currentTemp = computed(() => {
  if (!degCelsius.value) return `${current.temp_c}°C`
  return `${current.temp_f}°F`
})
const feelsLike = computed(() => {
  if (!degCelsius.value) return `${current.feelslike_c}°C`
  return `${current.feelslike_f}°F`
})
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
          <h1>{{ currentTemp }}</h1>
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
            <span>{{ feelsLike }}</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="card-actions justify-between">
          <div class="flex align-center">
            <span class="text-gray-500">°C</span>
            <input v-model="degCelsius" type="checkbox" class="toggle mx-1" />
            <span class="text-gray-500">°F</span>
          </div>
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
